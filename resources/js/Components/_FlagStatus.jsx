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
          ? "Unknown"
          : flagStatus.status === "always-enabled"
          ? "Always Enabled"
          : flagStatus.status === "enabled-by-default"
          ? "Enabled by Default"
          : flagStatus.status === "disabled-by-default"
          ? "Disabled by Default"
          : flagStatus.status === "always-disabled"
          ? "Always Disabled"
          : flagStatus.status === "removed"
          ? "Removed"
          : ""
      }
      </span>
    </div>
  );
}
