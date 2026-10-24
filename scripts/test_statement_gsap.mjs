import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

console.log('GSAP & ScrollTrigger registered successfully');
console.log('Timeline test:');

const tl = gsap.timeline({ defaults: { ease: 'power2.inOut', duration: 1 } });
tl.to({}, { duration: 0.6 });
console.log('Timeline created, duration:', tl.duration());
