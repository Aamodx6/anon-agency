import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import Matter from 'matter-js';

console.log('THREE version:', THREE.REVISION);
console.log('Matter version:', Matter.version);

// Test SVG parsing
const loader = new SVGLoader();
const svgData = loader.parse('<svg xmlns="http://www.w3.org/2000/svg"><path d="M21.8196 29.2139C20.7519 29.2139 20.2876 28.8867 20.2876 27.6246V17.2011C20.2876 11.6388 16.8058 8.60057 10.7705 8.60057C5.0603 8.60057 1.29989 11.3584 0.742796 16.0326H4.54962C5.01387 13.602 7.24226 12.0127 10.5848 12.0127C14.2988 12.0127 16.4808 13.8824 16.4808 16.9674V18.6034H9.51707C3.29616 18.6034 0 21.2677 0 26.0354C0 30.3824 3.52828 33 8.72785 33C12.8132 33 15.1809 31.1771 16.6665 29.0269C16.7129 31.364 17.7807 32.7195 20.9376 32.7195H23.0267V29.2139H21.8196ZM16.4808 22.9972C16.4808 26.9703 13.7417 29.728 9.0064 29.728C5.84952 29.728 3.85325 28.1388 3.85325 25.8017C3.85325 23.0907 5.75667 21.8286 9.14567 21.8286H16.4808V22.9972Z"/></svg>');

console.log('Paths parsed:', svgData.paths.length);
const shapes = svgData.paths.flatMap(p => p.toShapes(true));
console.log('Shapes created:', shapes.length);

console.log('SVGLoader test passed successfully!');
