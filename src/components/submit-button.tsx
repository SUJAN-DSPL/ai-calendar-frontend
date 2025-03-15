import { ComponentProps, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";

interface SubmitButtonProps extends ComponentProps<"button"> {
  isLoading: boolean;
  loaderColor?: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  position: "absolute",
};

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ loaderColor = "black", isLoading, className, ...props }, ref) => {
    return (
      <button
        type="submit"
        className={` cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all transform hover:scale-[1.02]
         ${
           isLoading
             ? ""
             : "bg-blue-600 shadow-lg shadow-blue-200 hover:bg-blue-700"
         }`}
      >
        {isLoading ? (
          <div className=" flex items-center text-gray-700 gap-3">
            <ClipLoader
              color={loaderColor}
              loading={isLoading}
              cssOverride={override}
              size={18}
              aria-label="Loading Spinner"
              data-testid="loader"
            />{" "}
            <p className="ml-10">loading ...</p>
          </div>
        ) : (
          props.children
        )}
      </button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
