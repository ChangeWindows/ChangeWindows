import React from 'react';
import { usePage } from '@inertiajs/react';

import NavigationBar from './components/NavigationBar';

import { aiGauge, aiMegaphone, aiCodeBranch, aiDevices, aiPatreon, aiBarsStaggered, aiTwitter, aiGear, aiFlag } from '@studio384/amaranth';

export default function Navigation() {
  const { navCan } = usePage().props;

  return (
    <NavigationBar
      main={[
        { type: 'link', url: '/timeline', icon: aiBarsStaggered, title: 'Timeline' },
        { type: 'link', url: '/flags', icon: aiFlag, title: 'Flags' },
        { type: 'link', url: '/platforms', primary: '/pc', icon: aiDevices, title: 'Platforms' },
        { type: 'link', url: '/channels', icon: aiCodeBranch, title: 'Channels' },
        { type: 'divider' },
        { type: 'link', url: '/settings', icon: aiGear, title: 'Settings' }
      ]}
      overflow={[
        { type: 'external', url: 'https://medium.com/changewindows', icon: aiMegaphone, title: 'Blog' },
        { type: 'link', url: '/admin/flights', icon: aiGauge, title: 'Backstage', permission: navCan.dashboard }
      ]}
      socials={[
        { type: 'external', url: 'https://twitter.com/changewindows', icon: aiTwitter, title: 'Follow' },
        { type: 'external', url: 'https://patreon.com/changewindows', icon: aiPatreon, title: 'Sponsor' }
      ]}
    />
  )
}
