import { makeStyles } from "@material-ui/styles";
import React from "react";

export const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      style={{ background: "none" }}
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="#435af5"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth="8"
        transform="rotate(125.808 50 50)"
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};

const useStyles = makeStyles({
    root: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 5000,
        opacity: 1,
        visibility: "visible",
        backgroundColor: "rgba(#F9FAFC, .7)"
    },
    img: { 
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "block",
        width: "100px"
    },
    label: {
        textAlign: "center"
    }
}, { classNamePrefix: "spinner" });

export interface LoaderProps {
    loadingLabel: string;
}

export const Loader = ({loadingLabel}: LoaderProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.img}>
                <Spinner/>
                <p className={classes.label}>{loadingLabel}</p>
            </div>
        </div>
    )
};
