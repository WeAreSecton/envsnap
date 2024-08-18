<p align="center">
  <img src="https://cdn.secton.org/envsnap/logo.svg" height="60" alt="envsnap Logo" />
</p>

<p align="center">
  <a href="https://github.com/WeAreSecton/envsnap">
    <img src="https://img.shields.io/github/repo-size/WeAreSecton/envsnap" alt="Repo Size" />
  </a>
  <a href="https://github.com/WeAreSecton/envsnap/issues">
    <img src="https://img.shields.io/github/issues/WeAreSecton/envsnap" alt="Issues" />
  </a>
  <a href="https://github.com/WeAreSecton/envsnap/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/WeAreSecton/envsnap" alt="License" />
  </a>
</p>

## Features

- **Create** environments with a single command
- **Set** and **Use** environments seamlessly
- **List** all available environments
- **Delete** environments when they're no longer needed
- **Automatic** validation of `.env` file formats *(coming soon)*

## Installation

To install `envsnap`, you need **Node.js** and **npm** installed on your system. Once you have those, you can install `envsnap` globally using *npm*:

```sh
npm install -g envsnap
```

Or use *npx* to run it without global installation:

```sh
npx envsnap <command>
```

## Usage

### Create an environment
```sh
npx envsnap create staging
```

### Set the active environment
```sh
npx envsnap set staging
```

### Use a specific environment
```sh
npx envsnap use staging
```

### Delete an environment
```sh
npx envsnap delete staging
```

### List all environemnts
```sh
npx envsnap list
```

## License
**envsnap** is licensed under the MIT License. See the <a href="https://github.com/WeAreSecton/envsnap/blob/main/LICENSE">LICENSE</a> file for more information.

###### Thank you for using envsnap! We hope it makes managing your environment configurations a breeze.