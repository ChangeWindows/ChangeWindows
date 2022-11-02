import AmaranthIcon, {
  aiChangewindows,
  aiCircleUser,
} from "@changewindows/amaranth";
import React from "react";

import "../../../../sass/air/style.scss";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { Head } from "@inertiajs/inertia-react";
import PlatformIcon from "../../../Components/Platforms/PlatformIcon";

export default function Header({ platforms, legacyPlatforms, platform }) {
  return (
    <div
      className="app"
      style={
        platform && {
          "--platform-color": platform.color,
        }
      }
    >
      <Head>
        <title>CW Air</title>
      </Head>
      <div className="bg-light">
        <div className="container d-flex justify-content-between align-items-center py-4 px-3 px-sm-0">
          <AmaranthIcon icon={aiChangewindows} className="fs-3 text-muted" />
          <Nav>
            <Nav.Item>
              <Nav.Link
                href={route("air.timeline")}
                active={route().current("air.timeline")}
              >
                Timeline
              </Nav.Link>
            </Nav.Item>
            {platforms.map((_platform) => (
              <Nav.Item key={_platform.slug}>
                <Nav.Link
                  href={route("air.platform", _platform)}
                  active={route().current("air.platform", _platform)}
                  style={{ "--item-color": _platform.color }}
                >
                  {_platform.name}
                </Nav.Link>
              </Nav.Item>
            ))}
            <Dropdown as={Nav.Item} align="center">
              <Dropdown.Toggle as={Nav.Link}>More</Dropdown.Toggle>
              <Dropdown.Menu>
                {legacyPlatforms.map((_platform) => (
                  <Dropdown.Item
                    key={_platform.slug}
                    href={route("air.platform", _platform)}
                    active={route().current("air.platform", _platform)}
                    style={{ "--item-color": _platform.color }}
                  >
                    {_platform.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <Nav.Link
                href={route("air.flags")}
                active={route().current("air.flags")}
              >
                Flags
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <AmaranthIcon icon={aiCircleUser} className="fs-6 text-muted" />
        </div>
        {platform && (
          <div className="container d-flex justify-content-between align-items-center py-2 px-3 px-sm-0 border-top">
            <PlatformIcon platform={platform} className="text-muted" />
            <Nav className="platform-colored">
              <Nav.Item>
                <Nav.Link
                  href={route("air.platform", platform)}
                  active={route().current("air.platform", platform)}
                  style={{ "--item-color": platform.color }}
                >
                  Timeline
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href={route("air.platform.releases", platform)}
                  active={route().current("air.platform.releases", platform)}
                  style={{ "--item-color": platform.color }}
                >
                  Releases
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href={route("air.platform.channels", platform)}
                  active={route().current("air.platform.channels", platform)}
                  style={{ "--item-color": platform.color }}
                >
                  Channels
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        )}
      </div>
    </div>
  );
}
