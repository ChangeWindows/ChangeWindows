import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiTrashCan } from "@changewindows/amaranth";

export default function Edit({ can, tweet_stream, status }) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(tweet_stream);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.tweet_streams.update", tweet_stream));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.tweet_streams.destroy", tweet_stream));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/tweet_streams"
          actions={can.tweetStrems.edit && <SaveButton loading={processing} />}
        >
          {data.name || "Unnamed Twitter Tweet Stream"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Identity"
            description="About this feed."
            disabled={!can.tweetStreams.edit}
          >
            <div className="col-12 col-lg-6">
              <TextField
                id="name"
                label="Name"
                value={data.name}
                errors={errors.name}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="account"
                label="Account"
                value={data.account}
                errors={errors.account}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Authentication"
            description="Connecting to the Twitter API."
            disabled={!can.tweetStreams.edit}
          >
            <div className="col-12">
              <TextField
                id="consumer_key"
                label="Consumer Key"
                value={data.consumer_key}
                errors={errors.consumer_key}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                id="consumer_secret"
                label="Consumer Secret"
                value={data.consumer_secret}
                errors={errors.consumer_secret}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                id="access_token"
                label="Access Token"
                value={data.access_token}
                errors={errors.access_token}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                id="access_token_secret"
                label="Access Token Secret"
                value={data.access_token_secret}
                errors={errors.access_token_secret}
                onChange={setData}
              />
            </div>
          </Fieldset>
        </div>
      </form>
      {can.tweetStreams.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a tweet stream will remove all the content associated
                with that tweet stream. Are you sure?
              </p>
              <button className="btn btn-danger btn-sm" type="submit">
                <AmaranthIcon icon={aiTrashCan} /> Delete
              </button>
            </div>
          </Fieldset>
        </form>
      )}
    </Admin>
  );
}
