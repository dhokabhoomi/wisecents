import React, { forwardRef } from "react";
import "./Button.css";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      onClick,
      type = "button",
      disabled = false,
      loading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`btn btn-${variant} btn-${size} ${
          fullWidth ? "btn-full" : ""
        } ${loading ? "loading" : ""} ${className}`}
        {...props}
      >
        {loading ? <span className="spinner" /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
