<a name="readme-top"></a>
# http-param-expander
Make your life easier with HTTP parameter encoding for typescript/javascript projects!

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![CI][Workflow-build-shield]][Workflow-build-url]


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#changelog">Changelog</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About The Project

This Library aims to make your life easier with HTTP parameter encoding for typescript/javascript projects:
* [matrix parameters][stackoverflow-matrix-params-url] (mostly used by Java [Jax-RS][oracle-jaxrs-url] projects)
* query parameters
* form parameters
* label parameters
* simple parameters
* and some more esoteric and custom parameter styles

Each in its exploded and flat form.

This is especially useful for REST-clients generated by [OpenAPI generator](https://openapi-generator.tech/) where only a small subset of parameter styles is supported out of the box.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

This npm library is intended to be used in typescript and javascript projects.

Just install the NPM package:
```sh
npm install @honoluluhenk/http-param-expander
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

```typescript
import {MatrixParamExpander} from './matrix-param-expander'; 

const expander = new MatrixParamExpander();
const expanded = expander.expand({name: foo, value: {hello: 'world', bar: 'baz'}, exploded: true});
console.log(expanded);
// ;hello=world;bar=baz
```

Available expanders:
* [FormParamExpander](src/expanders/form-param-expander.ts)
* [LabelParamExpander](src/expanders/label-param-expander.ts)
* [MatrixParamExpander](src/expanders/matrix-param-expander.ts)
* [SimpleParamExpander](src/expanders/simple-param-expander.ts)
* [FormParamExpander](src/expanders/multi-style-expander.ts) (delegates to one of the above)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Changelog
See [releases][releases-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Implement expander for deepObject style
- [ ] Implement expander for spaceDelimited style
- [ ] Implement expander for papeDelimited style

See the [open issues](https://github.com/HonoluluHenk/http-param-expander/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## License

Distributed under the Lesser Gnu Public License 2.1 (LGPL-2.1) License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Contact

Christoph Linder - post@christoph-linder.ch

Project Link: [https://github.com/HonoluluHenk/http-param-expander](https://github.com/HonoluluHenk/http-param-expander)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Acknowledgments

* The [OpenAPI Initiative](https://www.openapis.org/) Project for their specifications and good generator tools

<p align="right">(<a href="#readme-top">back to top</a>)</p>



[contributors-shield]: https://img.shields.io/github/contributors/HonoluluHenk/http-param-expander.svg?style=for-the-badge
[contributors-url]: https://github.com/HonoluluHenk/http-param-expander/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/HonoluluHenk/http-param-expander.svg?style=for-the-badge
[forks-url]: https://github.com/HonoluluHenk/http-param-expander/network/members
[stars-shield]: https://img.shields.io/github/stars/HonoluluHenk/http-param-expander.svg?style=for-the-badge
[stars-url]: https://github.com/HonoluluHenk/http-param-expander/stargazers
[issues-shield]: https://img.shields.io/github/issues/HonoluluHenk/http-param-expander.svg?style=for-the-badge
[issues-url]: https://github.com/HonoluluHenk/http-param-expander/issues
[releases-url]: https://github.com/HonoluluHenk/http-param-expander/releases
[license-shield]: https://img.shields.io/github/license/HonoluluHenk/http-param-expander.svg?style=for-the-badge
[license-url]: https://github.com/HonoluluHenk/http-param-expander/blob/master/LICENSE.txt
[Workflow-build-shield]: https://github.com/HonoluluHenk/http-param-expander/actions/workflows/build-and-publish.yml/badge.svg?branch=main
[Workflow-build-url]: https://github.com/HonoluluHenk/http-param-expander/actions/workflows/build-and-publish.yml
[stackoverflow-matrix-params-url]: https://stackoverflow.com/questions/2048121/url-matrix-parameters-vs-query-parameters
[oracle-jaxrs-url]: https://www.oracle.com/technical-resources/articles/java/jax-rs.html
