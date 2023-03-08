import React from "react";

export default function FeatureStatus({ featureStatus, hideBuild = false }) {
  console.log(featureStatus);
  return (
    <div
      className={`text-sm fw-bold d-inline-block lh-1 ${
        featureStatus.status === "unknown"
          ? "bg-light text-dark"
          : featureStatus.status === "always-enabled"
          ? "bg-green text-dark"
          : featureStatus.status === "enabled-by-default"
          ? "bg-yellow text-dark"
          : featureStatus.status === "disabled-by-default"
          ? "bg-orange text-dark"
          : featureStatus.status === "always-disabled"
          ? "bg-red text-dark"
          : featureStatus.status === "removed"
          ? "bg-black text-light"
          : ""
      } rounded`}
    >
      {!hideBuild && (
        <span className="d-inline-block bg-dark bg-opacity-25 px-2 py-1 h-100">
          {featureStatus.build}
        </span>
      )}
      <span className="d-inline-block px-2 py-1 h-100">
      {
        featureStatus.status === "unknown"
          ? <>U<span className="d-none d-lg-inline">nknown</span></>
          : featureStatus.status === "always-enabled"
          ? <>A<span className="d-none d-lg-inline">lways </span>E<span className="d-none d-lg-inline">nabled</span></>
          : featureStatus.status === "enabled-by-default"
          ? <>E<span className="d-none d-lg-inline">nabled </span>b<span className="d-none d-lg-inline">y </span>D<span className="d-none d-lg-inline">efault</span></>
          : featureStatus.status === "disabled-by-default"
          ? <>D<span className="d-none d-lg-inline">isabled </span>b<span className="d-none d-lg-inline">y </span>D<span className="d-none d-lg-inline">efault</span></>
          : featureStatus.status === "always-disabled"
          ? <>A<span className="d-none d-lg-inline">lways </span>D<span className="d-none d-lg-inline">isabled</span></>
          : featureStatus.status === "removed"
          ? <>R<span className="d-none d-lg-inline">emoved</span></>
          : ""
      }
      </span>
    </div>
  );
}
