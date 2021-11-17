import React from 'react';
import { usePage } from '@inertiajs/inertia-react'

import NavigationBar from './components/NavigationBar';

import { aiArrowLeft, aiBox, aiBranchUp, aiDevices, aiLock, aiPlane, aiRocket, aiSoftwareBox, aiTwitter, aiUser, aiUserLock } from '@changewindows/amaranth';

export default function AdminNavigation() {
  const { nav_can } = usePage().props;

  return (
    <NavigationBar
      main={[
        { type: 'link', url: '/admin/flights', icon: aiPlane, title: 'Flights', permission: nav_can.show_flights },
        { type: 'link', url: '/admin/releases', icon: aiSoftwareBox, title: 'Releases', permission: nav_can.show_releases },
        { type: 'link', url: '/admin/packages', icon: aiBox, title: 'Packages', permission: nav_can.show_releases },
        { type: 'link', url: '/admin/platforms', icon: aiDevices, title: 'Platforms', permission: nav_can.show_platforms },
        { type: 'link', url: '/admin/promotions', icon: aiBranchUp, title: 'Promotions', permission: nav_can.show_flights },
        { type: 'link', url: '/admin/launches', icon: aiRocket, title: 'Launches', permission: nav_can.show_flights }
      ]}
      overflow={[
        { type: 'link', url: '/admin/tweet_streams', icon: aiTwitter, title: 'Twitter', permission: nav_can.show_tweet_streams },
        { type: 'divider' },
        { type: 'link', url: '/admin/users', icon: aiUser, title: 'Users', permission: nav_can.show_users },
        { type: 'link', url: '/admin/roles', icon: aiUserLock, title: 'Roles', permission: nav_can.show_roles },
        { type: 'link', url: '/admin/permissions', icon: aiLock, title: 'Permissions', permission: nav_can.show_permissions }
      ]}
      socials={[]}
    />
  )
}