import React from 'react';
import { usePage } from '@inertiajs/react'

import NavigationBar from './components/NavigationBar';

import { aiDevices, aiFlag, aiLock, aiPlane, aiBoxOpenFull, aiPerson, aiPersonLock } from '@studio384/amaranth';

export default function AdminNavigation() {
  const { navCan } = usePage().props;

  return (
    <NavigationBar
      main={[
        { type: 'link', url: '/admin/flights', icon: aiPlane, title: 'Flights', permission: navCan.flights.show },
        { type: 'link', url: '/admin/flags', icon: aiFlag, title: 'Flags', permission: navCan.flags.show },
        { type: 'link', url: '/admin/releases', icon: aiBoxOpenFull, title: 'Releases', permission: navCan.flights.show },
        { type: 'link', url: '/admin/platforms', icon: aiDevices, title: 'Platforms', permission: navCan.platforms.show }
      ]}
      overflow={[
        { type: 'link', url: '/admin/users', icon: aiPerson, title: 'Users', permission: navCan.users.show },
        { type: 'link', url: '/admin/roles', icon: aiPersonLock, title: 'Roles', permission: navCan.roles.show },
        { type: 'link', url: '/admin/permissions', icon: aiLock, title: 'Permissions', permission: navCan.permissions.show }
      ]}
      socials={[]}
    />
  )
}
