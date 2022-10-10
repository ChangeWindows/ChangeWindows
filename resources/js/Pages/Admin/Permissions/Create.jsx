import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import TextField from "@/Components/UI/Forms/TextField";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import Checkbox from "@/Components/UI/Forms/Checkbox";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    variants: [],
  });

  function variantHandler(event) {
    const id = event.target.id;

    if (data.variants.find((permission) => permission === id)) {
      setData(
        "variants",
        data.variants.filter((permission) => permission !== id)
      );
    } else {
      setData("variants", [...data.variants, id]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    post(route("admin.permissions.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/permissions"
          actions={<SaveButton loading={processing} />}
        >
          {data.name || "Unnamed permission"}
        </NaviBar>

        <div className="container my-3">
          <Fieldset
            title="General"
            description="Basic settings."
          >
            <div className="col-12 col-sm-6">
              <TextField
                id="name"
                label="Name"
                value={data.name}
                errors={errors.name}
                onChange={setData}
                disabled={data.variants.length >= 1}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Variants"
            description="Select which variants of this permission should be created."
          >
            {["", ".show", ".create", ".update", ".delete"].map(
              (variant, key) => (
                <div className="col-12 col-sm-6 col-md-4" key={key}>
                  <Checkbox
                    id={`${data.name}${variant}`}
                    name="variant"
                    label={
                      <>
                        {data.name}
                        <span className="text-muted">{variant}</span>
                      </>
                    }
                    checked={
                      data.variants.filter(
                        (_permission) =>
                          _permission === `${data.name}${variant}`
                      ).length === 1
                    }
                    onChange={variantHandler}
                  />
                </div>
              )
            )}
          </Fieldset>
        </div>
      </form>
    </Admin>
  );
}
