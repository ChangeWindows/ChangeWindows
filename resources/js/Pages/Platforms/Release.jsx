import React from "react";

import Channel from "@/Components/Cards/Channel";
import Pagination from "@/Components/Pagination";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Flight from "@/Components/Timeline/Flight";
import Timeline from "@/Components/Timeline/Timeline";
import App from "@/Layouts/App";

import { Tabs } from "@base-ui/react";
import { Link as ILink, Head } from "@inertiajs/react";
import Amicon, { aiAngleLeft, aiAngleRight, aiArrowLeft, aiNotes, aiBarsStaggered } from "@studio384/amaranth";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { parseISO } from "date-fns";

import LifeCycle from "./_LifeCycle";

export default function Release({ release, platform, channels, timeline, pagination, quickNav }) {
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
          class: "table table-bordered table-sm",
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
          class: "table table-bordered table-sm",
        },
      }),
    ],
    content: release.changelog,
  });

  return (
    <App>
      <Head title={release.name} />

      <Tabs.Root defaultValue="timeline">
        <nav className="navbar navbar-expand-xl sticky-top">
          <div className="container">
            <ILink href={route("front.platforms.show", platform)} className="btn btn-transparent btn-sm me-2">
              <Amicon icon={aiArrowLeft} />
            </ILink>
            <Tabs.List className="nav d-flex d-xl-none">
              <Tabs.Tab value="timeline" className="nav-link">
                <Amicon icon={aiBarsStaggered} /> Timeline
              </Tabs.Tab>
              <Tabs.Tab value="changelog" className="nav-link">
                <Amicon icon={aiNotes} /> Changelog
              </Tabs.Tab>
            </Tabs.List>
            <div className="flex-grow-1" />
            {quickNav.prev && (
              <ILink
                href={route("front.platforms.releases", [platform, quickNav.prev])}
                className="btn btn-transparent btn-sm"
              >
                <Amicon icon={aiAngleLeft} />
                <span className="d-none d-sm-inline"> {quickNav.prev.version}</span>
              </ILink>
            )}
            {quickNav.next && (
              <ILink
                href={route("front.platforms.releases", [platform, quickNav.next])}
                className="btn btn-transparent btn-sm ms-2"
              >
                <span className="d-none d-sm-inline">{quickNav.next.version} </span>
                <Amicon icon={aiAngleRight} />
              </ILink>
            )}
          </div>
        </nav>

        <div className="container">
          <div className="row g-1">
            <div className="titlebar col-12">
              <div className="d-flex">
                <div className="me-3">
                  <h1>
                    <PlatformIcon platform={platform} color />
                  </h1>
                </div>
                <div>
                  <h1 className="fw-bold m-0" style={{ color: platform.color }}>
                    {release.name}
                  </h1>
                  <h2 className="h6 text-muted m-0">
                    Version {release.version}, {release.codename}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-12">
              <Tabs.Panel value="timeline">
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
                          date={channel.flight?.date ? parseISO(channel.flight.date) : "No flight"}
                          disabled={channel.disabled}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="d-none d-xl-block col-xl-8 col-xxl-9 mt-4">
                    <EditorContent editor={editor} className="editor-content" key="main" />
                  </div>
                  <div className="col-xl-4 col-xxl-3 col-12 mt-4">
                    <div className="row g-1">
                      {Object.keys(timeline).map((date, key) => (
                        <Timeline date={parseISO(timeline[date].date)} key={key}>
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
              </Tabs.Panel>
              <Tabs.Panel value="changelog">
                <div className="row">
                  <div className="col-12 mt-3">
                    <EditorContent editor={editorTwo} className="editor-content" key="secondary" />
                  </div>
                </div>
              </Tabs.Panel>
            </div>
          </div>
        </div>
      </Tabs.Root>
    </App>
  );
}
