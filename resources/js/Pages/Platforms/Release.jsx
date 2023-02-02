import React from "react";
import { Link as ILink, Head } from "@inertiajs/react";

import App from "@/Layouts/App";
import Channel from "@/Components/Cards/Channel";
import Flight from "@/Components/Timeline/Flight";
import LifeCycle from "./_LifeCycle";
import Pagination from "@/Components/Pagination";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Timeline from "@/Components/Timeline/Timeline";

import AmaranthIcon, {
  aiAngleLeft,
  aiAngleRight,
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
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Nav, Tab } from "react-bootstrap";

export default function Release({
  release,
  platform,
  channels,
  timeline,
  pagination,
  quickNav,
}) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Typography,
      Underline,
      Link,
      TableRow,
      TableHeader,
      TableCell,
      Table.configure({
        HTMLAttributes: {
          class: "table",
        },
      }),
    ],
    content: release.changelog,
  });
  const editorTwo = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Typography,
      Underline,
      Link,
      TableRow,
      TableHeader,
      TableCell,
      Table.configure({
        HTMLAttributes: {
          class: "table",
        },
      }),
    ],
    content: release.changelog,
  });

  return (
    <App>
      <Head title={release.name} />

      <Tab.Container defaultActiveKey="timeline">
        <nav className="navbar navbar-expand-xl navbar-light sticky-top">
          <div className="container">
            <ILink
              href={route("front.platforms.show", platform)}
              className="btn btn-transparent btn-sm me-2"
            >
              <AmaranthIcon icon={aiArrowLeft} />
            </ILink>
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
            {quickNav.prev && (
              <ILink
                href={route("front.platforms.releases", [
                  platform,
                  quickNav.prev,
                ])}
                className="btn btn-transparent btn-sm"
              >
                <AmaranthIcon icon={aiAngleLeft} />
                <span className="d-none d-sm-inline">
                  {" "}
                  {quickNav.prev.version}
                </span>
              </ILink>
            )}
            {quickNav.next && (
              <ILink
                href={route("front.platforms.releases", [
                  platform,
                  quickNav.next,
                ])}
                className="btn btn-transparent btn-sm ms-2"
              >
                <span className="d-none d-sm-inline">
                  {quickNav.next.version}{" "}
                </span>
                <AmaranthIcon icon={aiAngleRight} />
              </ILink>
            )}
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
                  <h2 className="h6 m-0 text-muted">
                    Version {release.version}, {release.codename}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-12">
              <Tab.Content>
                <Tab.Pane eventKey="timeline">
                  <div className="row">
                    <div className="col-12 mt-3">
                      <LifeCycle release={release} />
                    </div>
                    <div className="col-12 mt-4">
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
                    <div className="d-none d-xl-block col-xl-8 col-xxl-9 mt-4">
                      <EditorContent
                        editor={editor}
                        className="editor-content"
                        key="main"
                      />
                    </div>
                    <div className="col-12 col-xl-4 col-xxl-3 mt-4">
                      <div className="row g-1">
                        {Object.keys(timeline).map((date, key) => (
                          <Timeline
                            date={parseISO(timeline[date].date)}
                            key={key}
                          >
                            {timeline[date].flights.map((flight, _key) => (
                              <Flight
                                key={`${flight.type}-${flight.id}`}
                                platform={flight.platform}
                                build={flight.flight}
                                channels={flight.release_channel}
                                version={flight.version}
                                sidebar={true}
                                overview
                              />
                            ))}
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
                        editor={editorTwo}
                        className="editor-content"
                        key="secondary"
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
