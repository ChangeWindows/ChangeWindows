import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import TextField from "@/Components/UI/Forms/TextField";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import Select from "@/Components/UI/Forms/Select";
import Checkbox from "@/Components/UI/Forms/Checkbox";

export default function Create({ tweet_streams }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    icon: "",
    color: "#",
    position: 0,
    active: 1,
    legacy: 0,
    tweet_template: "",
    tweet_stream_id: null,
    retweet_stream_id: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.platforms.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/platforms"
          actions={<SaveButton loading={processing} />}
        >
          <PlatformIcon platform={data} color className="me-2" />{" "}
          {data.name || "Unnamed platform"}
        </NaviBar>

        <div className="container my-3">
          <Fieldset title="Identity" description="About this platform.">
            <div className="col-12 col-lg-6">
              <TextField
                id="name"
                label="Name"
                value={data.name}
                errors={errors.name}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                type="textarea"
                id="description"
                label="Description"
                value={data.description}
                errors={errors.description}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset title="Appearance" description="The way it will look.">
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="position"
                label="Position"
                value={data.position}
                errors={errors.position}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="color"
                label="Color"
                value={data.color}
                errors={errors.color}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="icon"
                label="Icon"
                value={data.icon}
                errors={errors.icon}
                onChange={setData}
                helper="Note that ChangeWindows only supports a limited set of icons as value here, any unsupported icon will be replaced with the Windows logo."
              />
            </div>
          </Fieldset>
          <Fieldset title="Status" description="The platform's current status.">
            <div className="col-12 col-lg-6">
              <Checkbox
                id="active"
                label="Active"
                helper="This platform is still receiving updates."
                checked={data.active}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Checkbox
                id="legacy"
                label="Legacy"
                helper="This platform has been deprecated or is nearing deprecation."
                checked={data.legacy}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Checkbox
                id="tool"
                label="Tool"
                helper="This platform is a tool and should not be displayed beyond the timeline."
                checked={data.tool}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Tweet Stream"
            description="Keeping people up-to-date with Twitter."
          >
            <div className="col-12 col-lg-6">
              <Select
                id="tweet_stream_id"
                label="Tweet Stream"
                value={data.tweet_stream_id}
                selects={tweet_streams}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.tweet_stream_id}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Select
                id="retweet_stream_id"
                label="Retweet Stream"
                value={data.retweet_stream_id}
                selects={tweet_streams}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.retweet_stream_id}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                type="textarea"
                label="Tweet Template"
                id="tweet_template"
                value={data.tweet_template}
                errors={errors.tweet_template}
                onChange={setData}
                helper={
                  <>
                    Include <code>%RELEASE%</code>, <code>%VERSION%</code>,{" "}
                    <code>%CODENAME%</code>, <code>%FLIGHT%</code>,{" "}
                    <code>%CHANNELS%</code>, and <code>%URL%</code>.
                  </>
                }
              />
            </div>
          </Fieldset>
        </div>
      </form>
    </Admin>
  );
}
