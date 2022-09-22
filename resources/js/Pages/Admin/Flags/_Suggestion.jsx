import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import AmaranthIcon, {
  aiCheck,
  aiSpinnerThird,
  aiTrashCan,
} from "@changewindows/amaranth";

export default function Suggestion({ suggestion }) {
  const { data, patch, processing } = useForm(suggestion);

  function submitDiscard(e) {
    e.preventDefault();
    patch(route("admin.flags.moderate.discard", data));
  }

  function submitApprove(e) {
    e.preventDefault();
    patch(route("admin.flags.moderate.approve", data));
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <h4 className="pb-3 mb-3 border-bottom">
              {suggestion.flag.feature_name}
            </h4>
          </div>
          <div className="col-6 border-end">
            {suggestion.flag.latest_contents ? (
              <>
                <h5>{suggestion.flag.latest_contents.name}</h5>
                <p>{suggestion.flag.latest_contents.description}</p>
              </>
            ) : (
              <i className="text-muted">This flag has no content set.</i>
            )}
          </div>
          <div className="col-6">
            <h5>{suggestion.name}</h5>
            <p>{suggestion.description}</p>
            <p>
              By{" "}
              {suggestion.user ? (
                suggestion.user.name
              ) : (
                <i className="text-muted">Anonymous</i>
              )}
            </p>
            <div className="btn-toolbar justify-content-between">
              <button
                className="btn btn-secondary btn-sm"
                onClick={submitDiscard}
              >
                <AmaranthIcon
                  icon={processing ? aiSpinnerThird : aiTrashCan}
                  spin={processing}
                />{" "}
                {processing ? "Saving..." : "Discard"}
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={submitApprove}
              >
                <AmaranthIcon
                  icon={processing ? aiSpinnerThird : aiCheck}
                  spin={processing}
                />{" "}
                {processing ? "Saving..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
