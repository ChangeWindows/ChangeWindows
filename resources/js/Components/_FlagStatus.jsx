import React from "react";

export default function FlagStatus({ flagStatus, hideBuild = false }) {
  return (
    <div
      className={`text-sm fw-bold d-inline-block lh-1 ${
        flagStatus.status === "unknown"
          ? "bg-light text-dark"
          : flagStatus.status === "always-enabled"
          ? "bg-green text-dark"
          : flagStatus.status === "enabled-by-default"
          ? "bg-yellow text-dark"
          : flagStatus.status === "disabled-by-default"
          ? "bg-orange text-dark"
          : flagStatus.status === "always-disabled"
          ? "bg-red text-dark"
          : flagStatus.status === "removed"
          ? "bg-black text-light"
          : ""
      } rounded`}
    >
      {!hideBuild && (
        <span className="d-inline-block bg-dark bg-opacity-25 px-2 py-1 h-100">
          {flagStatus.build}
        </span>
      )}
      <span className="d-inline-block px-2 py-1 h-100">
      {
        flagStatus.status === "unknown"
          ? <>U<span className="d-none d-lg-inline">nknown</span></>
          : flagStatus.status === "always-enabled"
          ? <>A<span className="d-none d-lg-inline">lways </span>E<span className="d-none d-lg-inline">nabled</span></>
          : flagStatus.status === "enabled-by-default"
          ? <>E<span className="d-none d-lg-inline">nabled </span>b<span className="d-none d-lg-inline">y </span>D<span className="d-none d-lg-inline">efault</span></>
          : flagStatus.status === "disabled-by-default"
          ? <>D<span className="d-none d-lg-inline">isabled </span>b<span className="d-none d-lg-inline">y </span>D<span className="d-none d-lg-inline">efault</span></>
          : flagStatus.status === "always-disabled"
          ? <>A<span className="d-none d-lg-inline">lways </span>D<span className="d-none d-lg-inline">isabled</span></>
          : flagStatus.status === "removed"
          ? <>R<span className="d-none d-lg-inline">emoved</span></>
          : ""
      }
      </span>
    </div>
  );
}
