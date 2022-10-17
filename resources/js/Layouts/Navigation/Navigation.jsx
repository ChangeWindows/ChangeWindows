import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

import NavigationBar from './components/NavigationBar';

import { aiDashboard, aiMessagePen, aiBranch, aiDevices, aiPatreon, aiBarsStaggered, aiTwitter, aiGear, aiFlag } from '@changewindows/amaranth';

export default function Navigation() {
  const { nav_can } = usePage().props;

  return (
    <NavigationBar
      main={[
        { type: 'link', url: '/timeline', icon: aiBarsStaggered, title: 'Timeline' },
        { type: 'link', url: '/flags', icon: aiFlag, title: 'Flags' },
        { type: 'link', url: '/platforms', primary: '/pc', icon: aiDevices, title: 'Platforms' },
        { type: 'link', url: '/channels', icon: aiBranch, title: 'Channels' },
        { type: 'divider' },
        { type: 'link', url: '/settings', icon: aiGear, title: 'Settings' }
      ]}
      overflow={[
        { type: 'external', url: 'https://medium.com/changewindows', icon: aiMessagePen, title: 'Blog' },
        { type: 'link', url: '/admin/flights', icon: aiDashboard, title: 'Backstage', permission: nav_can.access_dashboard }
      ]}
      socials={[
        { type: 'external', url: 'https://twitter.com/changewindows', icon: aiTwitter, title: 'Follow' },
        { type: 'external', url: 'https://patreon.com/changewindows', icon: aiPatreon, title: 'Sponsor' }
      ]}
    />
  )
}
