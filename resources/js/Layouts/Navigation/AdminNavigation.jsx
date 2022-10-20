import React from 'react';
import { usePage } from '@inertiajs/inertia-react'

import NavigationBar from './components/NavigationBar';

import { aiBox, aiBranchUp, aiDevices, aiFlag, aiLock, aiPlane, aiRocket, aiSoftwareBox, aiTwitter, aiUser, aiUserLock } from '@changewindows/amaranth';

export default function AdminNavigation() {
  const { navCan } = usePage().props;
  console.log(navCan);

  return (
    <NavigationBar
      main={[
        { type: 'link', url: '/admin/flights', icon: aiPlane, title: 'Flights', permission: navCan.flights.show },
        { type: 'link', url: '/admin/flags', icon: aiFlag, title: 'Flags', permission: navCan.flags.show },
        { type: 'link', url: '/admin/releases', icon: aiSoftwareBox, title: 'Releases', permission: navCan.flights.show },
        { type: 'link', url: '/admin/packages', icon: aiBox, title: 'Packages', permission: navCan.releases.show },
        { type: 'link', url: '/admin/platforms', icon: aiDevices, title: 'Platforms', permission: navCan.platforms.show },
        { type: 'link', url: '/admin/promotions', icon: aiBranchUp, title: 'Promotions', permission: navCan.flights.show },
        { type: 'link', url: '/admin/launches', icon: aiRocket, title: 'Launches', permission: navCan.flights.show }
      ]}
      overflow={[
        { type: 'link', url: '/admin/tweet_streams', icon: aiTwitter, title: 'Twitter', permission: navCan.tweetStreams.show },
        { type: 'divider' },
        { type: 'link', url: '/admin/users', icon: aiUser, title: 'Users', permission: navCan.users.show },
        { type: 'link', url: '/admin/roles', icon: aiUserLock, title: 'Roles', permission: navCan.roles.show },
        { type: 'link', url: '/admin/permissions', icon: aiLock, title: 'Permissions', permission: navCan.permissions.show }
      ]}
      socials={[]}
    />
  )
}
