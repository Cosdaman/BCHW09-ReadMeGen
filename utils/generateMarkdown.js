// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const dayjs = require('dayjs')

function renderLicenseBadge(license) {
  switch (license) {
    case "Apache 2.0 License":
      return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";

    case "GNU AGPL v3":
      return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)";

    case "GNU GPL v3":
      return "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](http://www.gnu.org/licenses/gpl-3.0.html)";

    case "GNU LGPL v3":
      return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)";

    case "Mozilla Public License 2.0":
      return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";

    case "The MIT License":
      return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";

    default:
      return "";
  }

}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  switch (license) {
    case "Apache 2.0 License":
      return "https://opensource.org/licenses/Apache-2.0";

    case "GNU AGPL v3":
      return "http://www.gnu.org/licenses/agpl-3.0";

    case "GNU GPL v3":
      return "http://www.gnu.org/licenses/gpl-3.0.html";

    case "GNU LGPL v3":
      return "http://www.gnu.org/licenses/lgpl-3.0";

    case "Mozilla Public License 2.0":
      return "https://opensource.org/licenses/MPL-2.0";

    case "The MIT License":
      return "https://opensource.org/licenses/MIT";

    default: return "";
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  switch (license) {

    case "Apache 2.0 License":
      return `Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
   
        http://www.apache.org/licenses/LICENSE-2.0
   
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.`;

    case "GNU AGPL v3":
      return `This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Affero General Public License as
      published by the Free Software Foundation, either version 3 of the
      License, or (at your option) any later version.
  
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Affero General Public License for more details.
  
      You should have received a copy of the GNU Affero General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/>.`;

    case "GNU GPL v3":
      return `This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/>.`;

    case "GNU LGPL v3":
      return `    This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/>.`;

    case "Mozilla Public License 2.0":
      return;

    case "The MIT License":
      return;

    default: return "";
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let year = dayjs().format("YYYY");
  let markdownObj =
  {
    badge: renderLicenseBadge(data.license),
    link: renderLicenseLink(data.license),
    content: `Copyright (C) ${year} ${data.github}  
    ${renderLicenseSection(data.license)}`
  };
  return markdownObj;
}



module.exports = generateMarkdown;
