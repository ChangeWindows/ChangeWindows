import App from "@/Layouts/App";

import { Head } from "@inertiajs/react";

export default function Index() {
  return (
    <App>
      <Head title="Search" />

      <div className="container">
        <div className="row g-1">
          <div className="titlebar col-12">
            <h1>Search</h1>
          </div>
          <div className="col-12 my-3">
            <p>You can search through our release list by name, version, canonical version, and codename.</p>
          </div>
        </div>
      </div>
    </App>
  );
}
