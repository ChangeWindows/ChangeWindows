import React, { useMemo, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";

import {
  Card,
  Checkbox,
  Container,
  Grid,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { Head } from "@inertiajs/react";
import Page from "../Layout/Page";
import { format, isValid, parse, parseISO } from "date-fns";
import PlatformIcon from "../Components/PlatformIcon";
import Toolbar from "../Components/Toolbar";
import SaveButton from "../Components/SaveButton";

export default function Create({ releases }) {
  const [showAll, setShowAll] = useState(false);
  const [showEligible, setShowEligible] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    major: "10",
    minor: "0",
    build: "14393",
    delta: "1000",
    releaseChannels: [],
    date: format(new Date(), "yyyy-MM-dd"),
    tweet: true,
  });

  const eligibleReleases = useMemo(() => {
    return releases.filter((release) => {
      if (
        !showAll &&
        (Number(data.build) < Number(release.start_build) ||
          (Number(data.build) === Number(release.start_build) &&
            Number(data.delta) < Number(release.start_delta)) ||
          Number(data.build) > Number(release.end_build) ||
          (Number(data.build) === Number(release.end_build) &&
            Number(data.delta) > Number(release.end_delta)))
      ) {
        return false;
      }

      if (!showAll && !showEligible) {
        release.availableChannels = release.channels
          .filter((channel) => channel.supported)
          .sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
      } else {
        release.availableChannels = release.channels.sort(
          (a, b) => parseFloat(a.order) - parseFloat(b.order)
        );
      }

      if (!showAll && release.availableChannels.length === 0) {
        return false;
      }

      return true;
    });
  }, [data, showAll, showEligible]);

  function channelHandler(id) {
    if (data.releaseChannels.find((channelId) => channelId === id)) {
      setData(
        "releaseChannels",
        data.releaseChannels.filter((channelId) => channelId !== id)
      );
    } else {
      setData("releaseChannels", [...data.releaseChannels, id]);
    }
  }

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
    post(route("admin.flights.store"));
  }

  return (
    <>
      <Head title="New flight" />
      <Page>
        <form onSubmit={handleSubmit}>
          <Toolbar title="New flight">
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
              <Card>
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <Typography>Integrations</Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Sheet
                      variant="outlined"
                      sx={{ py: 1, px: 1.5, borderRadius: "sm" }}
                    >
                      <Checkbox
                        label="Publish to Twitter"
                        id="tweet"
                        checked={!!data.tweet}
                        onChange={(e) => setData("tweet", e.target.checked)}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          mt: 0.5,
                        }}
                        overlay
                      />
                    </Sheet>
                  </Grid>
                </Grid>
              </Card>
              <Card>
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <Typography>Channels</Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Stack spacing={1}>
                      <Sheet
                        variant="outlined"
                        sx={{ py: 1, px: 1.5, borderRadius: "sm" }}
                      >
                        <Checkbox
                          label="Show all eligible releases and channels"
                          id="showEligible"
                          checked={showEligible}
                          onChange={() => setShowEligible(!showEligible)}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                          overlay
                        />
                      </Sheet>
                      <Sheet
                        variant="outlined"
                        sx={{ py: 1, px: 1.5, borderRadius: "sm" }}
                      >
                        <Checkbox
                          label="Show all releases and channels"
                          id="showAll"
                          checked={showAll}
                          onChange={() => setShowAll(!showAll)}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                          overlay
                        />
                      </Sheet>
                    </Stack>
                  </Grid>
                  <Grid xs={12}>
                    <Grid container spacing={3} sx={{ p: 0 }}>
                      {eligibleReleases.map((release, key) => (
                        <Grid xs={6} key={key}>
                          <Stack spacing={1}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <PlatformIcon
                                platform={release.platform}
                                sx={{ fontSize: "1.25rem" }}
                                color
                              />
                              <Stack>
                                <Typography level="body1">
                                  {release.name}
                                </Typography>
                                <Typography level="body3" lineHeight="sm">
                                  {`${release.start_build}.${release.start_delta}`}{" "}
                                  -{" "}
                                  {`${release.end_build}.${release.end_delta}`}
                                </Typography>
                              </Stack>
                            </Stack>
                            <List
                              size="sm"
                              sx={{
                                "--List-padding": 0,
                                "--List-gap": "2px",
                                "--ListItem-radius": "4px",
                                "--ListItemDecorator-size": "1.75rem",
                              }}
                            >
                              {release.availableChannels.map(
                                (channel, _key) => (
                                  <ListItem key={_key}>
                                    <ListItemButton
                                      onClick={() => channelHandler(channel.id)}
                                    >
                                      <ListItemDecorator>
                                        <Checkbox
                                          value="1"
                                          id={channel.id.toString()}
                                          checked={
                                            !!data.releaseChannels.find(
                                              (channelId) =>
                                                channelId === channel.id
                                            ) ?? false
                                          }
                                        />
                                      </ListItemDecorator>
                                      <ListItemContent>
                                        <Typography>
                                          <Typography
                                            sx={{
                                              color: channel.color ?? "inherit",
                                            }}
                                          >
                                            {channel.name}
                                          </Typography>
                                          {!channel.supported && (
                                            <Typography level="body3">
                                              {" "}
                                              <i>- Unsupported</i>
                                            </Typography>
                                          )}
                                        </Typography>
                                      </ListItemContent>
                                    </ListItemButton>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Stack>
                        </Grid>
                      ))}
                      {eligibleReleases.length === 0 && (
                        <div className="col-12">
                          {data.major === "10" && data.minor === "0" ? (
                            <p className="mb-0">
                              Enter a string to get started...
                            </p>
                          ) : (
                            <p className="mb-0">
                              This build doesn't seem to match any release...
                            </p>
                          )}
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Stack>
          </Container>
        </form>
      </Page>
    </>
  );
}
