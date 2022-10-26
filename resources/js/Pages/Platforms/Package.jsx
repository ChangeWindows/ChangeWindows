import React from "react";
import { InertiaLink, InertiaHead } from "@inertiajs/inertia-react";

import App from "@/Layouts/App";
import Channel from "@/Components/Cards/Channel";
import Flight from "@/Components/Timeline/Flight";
import Launch from "@/Components/Timeline/Launch";
import Pagination from "@/Components/Pagination";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Promotion from "@/Components/Timeline/Promotion";
import Timeline from "@/Components/Timeline/Timeline";

import AmaranthIcon, {
  aiArrowLeft,
  aiNotes,
  aiBarsStaggered,
} from "@changewindows/amaranth";

import { parseISO } from "date-fns";

import { useEditor, EditorContent } from "@tiptap/react";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";

export default function Package({
  release,
  platform,
  channels,
  timeline,
  pagination,
}) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Typography, Underline, Link],
    content: release.changelog,
  });
  const editorTwo = useEditor({
    editable: false,
    extensions: [StarterKit, Typography, Underline, Link],
    content: release.changelog,
  });

  return (
    <App>
      <InertiaHead title={release.name} />

      <Tab.Container defaultActiveKey="timeline">
        <nav className="navbar navbar-expand-xl navbar-light sticky-top">
          <div className="container">
            <InertiaLink
              href={`/platforms/${platform.slug}`}
              className="btn btn-transparent btn-sm me-2"
            >
              <AmaranthIcon icon={aiArrowLeft} />
            </InertiaLink>
            <Nav className="d-flex d-xl-none">
              <Nav.Item>
                <Nav.Link eventKey="timeline">
                  <AmaranthIcon icon={aiBarsStaggered} /> Timeline
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="changelog">
                  <AmaranthIcon icon={aiNotes} /> Changelog
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="flex-grow-1" />
          </div>
        </nav>

        <div className="container">
          <div className="row g-1">
            <div className="col-12 titlebar">
              <div className="d-flex">
                <div className="me-3">
                  <h1>
                    <PlatformIcon platform={platform} color />
                  </h1>
                </div>
                <div>
                  <h1 className="m-0 fw-bold" style={{ color: platform.color }}>
                    {release.name}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-12">
              <Tab.Content>
                <Tab.Pane eventKey="timeline">
                  <div className="row">
                    <div className="col-12 mt-3">
                      <div className="row g-1">
                        {channels.map((channel, key) => (
                          <Channel
                            key={key}
                            channel={{
                              color: channel.color,
                              name: channel.name,
                            }}
                            build={channel.flight.version ?? "None"}
                            date={
                              channel.flight?.date
                                ? parseISO(channel.flight.date)
                                : "No flight"
                            }
                            disabled={channel.disabled}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <div className="row g-1">
                        {Object.keys(timeline).map((date, key) => (
                          <Timeline
                            date={parseISO(timeline[date].date)}
                            key={key}
                          >
                            {timeline[date].flights.map((flight, _key) => {
                              if (flight.type === "flight") {
                                return (
                                  <Flight
                                    key={`${flight.type}-${flight.id}`}
                                    platform={flight.platform}
                                    build={flight.flight}
                                    channels={flight.release_channel}
                                    version={flight.version}
                                    pack={flight.package}
                                    overview
                                  />
                                );
                              }

                              if (flight.type === "promotion") {
                                return (
                                  <Promotion
                                    key={`${flight.type}-${flight.id}`}
                                    platform={flight.platform}
                                    channel={flight.release_channel}
                                    version={flight.version}
                                    overview
                                  />
                                );
                              }

                              if (flight.type === "launch") {
                                return (
                                  <Launch
                                    key={`${flight.type}-${flight.id}`}
                                    platform={flight.platform}
                                    version={flight.version}
                                    overview
                                  />
                                );
                              }
                            })}
                          </Timeline>
                        ))}
                        <Pagination pagination={pagination} />
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="changelog">
                  <div className="row">
                    <div className="col-12 mt-3">
                      <EditorContent
                        editor={editor}
                        className="editor-content"
                      />
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </div>
      </Tab.Container>
    </App>
  );
}
