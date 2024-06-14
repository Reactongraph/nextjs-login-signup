export const paths = {
  public: {
    signIn: "/login",
    signUp: "/register",
    emailVerify: "/email-verified",
    forgetPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  private: {
    dashboard: "/dashboard",
    note: "/dashboard/note",
    emailVerified: "/email-verified",
    resetPassword: "/reset-password",
    setting: "/dashboard/settings",
    logout: "/logout"
  },
  common: {
    home: "/",
    tnc: "/tnc",
  },
} as const;
