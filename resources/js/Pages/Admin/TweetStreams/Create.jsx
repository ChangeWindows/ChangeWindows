import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Fieldset from "@/Components/UI/Forms/Fieldset";

export default function Create({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    account: "",
    consumer_key: "",
    consumer_secret: "",
    access_token: "",
    access_token_secret: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.tweet_streams.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/tweet_streams"
          actions={<SaveButton loading={processing} />}
        >
          {data.name || "Unnamed Twitter Tweet Stream"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset title="Identity" description="About this feed.">
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
    </Admin>
  );
}
