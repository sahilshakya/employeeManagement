import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const BASE_URL = "http://localhost:8000/api";

const initialState = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser"))
  : {
      user: null,
      token: "",
      isAuthenticated: false,
      loading: false,
    };

function reducer(state, action) {
  switch (action.type) {
    case "login": {
      const loggedInUser = {
        ...state,
        user: action.payload.user,
        token: `Bearer ${action.payload.token}`,
        isAuthenticated: true,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      return loggedInUser;
    }
    case "logout":
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: "",
        isAuthenticated: false,
      };
    case "loading":
      return { ...state, loading: action.payload };
    default:
      throw new Error("Action not defined.");
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, token, isAuthenticated, loading } = state;

  async function login(email, password) {
    try {
      dispatch({ type: "loading", payload: true });
      const resp = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (data.data?.user) {
        dispatch({ type: "loading", payload: false });
        dispatch({ type: "login", payload: data.data });
      } else {
        alert(data.message);
      }
    } catch (err) {
      dispatch({ type: "loading", payload: false });
      alert(err.message);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, logout, BASE_URL }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context used outside the context provider");
  return context;
}

export { AuthProvider, useAuth };
