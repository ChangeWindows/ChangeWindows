import React, { useRef } from "react";
import { useForm } from "@inertiajs/react";

import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { Head } from "@inertiajs/react";
import Page from "../Layout/Page";
import { format, isValid, parse, parseISO } from "date-fns";
import PlatformIcon from "../Components/PlatformIcon";
import Toolbar from "../Components/Toolbar";
import SaveButton from "../Components/SaveButton";
import ChannelChip from "../Components/ChannelChip";
import AmaranthIcon, { aiTrashCan } from "@studio384/amaranth";

export default function Edit({
  can,
  flight,
  platform,
  release_channel,
  status,
}) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm({
    ...flight,
    date: format(parseISO(flight.date), "yyyy-MM-dd"),
  });

  const refMajor = useRef(null);
  const refMinor = useRef(null);
  const refBuild = useRef(null);
  const refDelta = useRef(null);

  function versionHandler(key, value) {
    const order = ["major", "minor", "build", "delta"];

    if (value[value.length - 1] === ".") {
      if (key === "major") {
        refMinor.current.focus();
      } else if (key === "minor") {
        refBuild.current.focus();
      } else if (key === "build") {
        refDelta.current.focus();
      }
    } else {
      if (value.includes(".")) {
        const version = value.split(".");

        const target = order.slice(order.indexOf(key));
        const fields = {};

        target.map((key, i) => {
          fields[key] = version[i] ?? "0";
        });

        setData({ ...data, ...fields });
      } else {
        setData(key, value);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.flights.update", { flight: flight.id }));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.flights.destroy", { flight: flight.id }));
  }

  return (
    <>
      <Head title={`${data.major}.${data.minor}.${data.build}.${data.delta}`} />
      <Page>
        <form onSubmit={handleSubmit}>
          <Toolbar
            back={route("admin.flights")}
            title={
              <Stack direction="row" alignItems="center" spacing={1}>
                <PlatformIcon platform={platform} color />
                <Typography>{`${data.major}.${data.minor}.${data.build}.${data.delta}`}</Typography>
                <ChannelChip channel={release_channel} />
              </Stack>
            }
          >
            <SaveButton loading={processing} />
          </Toolbar>

          <Container sx={{ py: 2 }}>
            <Stack spacing={2}>
              <Card>
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <Typography>Build string</Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Stack direction="row" spacing={1}>
                      <Input
                        placeholder="major"
                        value={data.major}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          versionHandler("major", e.target.value)
                        }
                        slotProps={{
                          input: { ref: refMajor },
                        }}
                      />
                      <Input
                        placeholder="minor"
                        value={data.minor}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          versionHandler("minor", e.target.value)
                        }
                        slotProps={{
                          input: { ref: refMinor },
                        }}
                      />
                      <Input
                        placeholder="build"
                        value={data.build}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          versionHandler("build", e.target.value)
                        }
                        slotProps={{
                          input: { ref: refBuild },
                        }}
                      />
                      <Input
                        placeholder="delta"
                        value={data.delta}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          versionHandler("delta", e.target.value)
                        }
                        slotProps={{
                          input: { ref: refDelta },
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid xs={6}>
                    <Input
                      type="date"
                      id="date"
                      placeholder="major"
                      value={
                        isValid(parse(data.date, "P", new Date()))
                          ? format(parseISO(data.date), "yyyy-MM-dd")
                          : data.date
                      }
                      onChange={(e) => setData("date", e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Stack>
          </Container>
        </form>
        <form onSubmit={handleDelete}>
          <Container sx={{ pt: 0, pb: 2 }}>
            <Card>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <Typography>Danger zone</Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography>
                    Deleting a flight will remove all the content associated
                    with that flight. Are you sure?
                  </Typography>
                  <Button
                    type="submit"
                    color="danger"
                    startDecorator={<AmaranthIcon icon={aiTrashCan} />}
                    loading={processing}
                    sx={{ mt: 1 }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </form>
      </Page>
    </>
  );
}
