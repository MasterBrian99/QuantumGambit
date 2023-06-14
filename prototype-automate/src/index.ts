import { Button } from "@nut-tree/nut-js";
import { sleep } from "@nut-tree/nut-js";
import { straightTo } from "@nut-tree/nut-js";
import { getActiveWindow, mouse, } from "@nut-tree/nut-js";

(async () => {

  const windowRef = await getActiveWindow();
  const currentMousePostition = await mouse.getPosition();
  console.log('engine started !');
  // console.log(windowRef.title);
  console.log(windowRef.region);
  // console.log(currentMousePostition);
  mouse.config.mouseSpeed = 5000;
  await mouse.move(straightTo({ x: 815, y: 60 }));
  await mouse.releaseButton(Button.LEFT)
  await mouse.click(Button.LEFT)
  await mouse.click(Button.LEFT)
  await mouse.releaseButton(Button.LEFT)
  mouse.config.mouseSpeed = 1200;
  console.log("getting random chess opening position");
  await sleep(1000)
  await mouse.move(straightTo({ x: 821, y: 845 }));
  console.log(currentMousePostition);
  await mouse.drag(straightTo({ x: 835, y: 660 }))
  await mouse.click(Button.LEFT)
  await mouse.click(Button.LEFT)
  await mouse.releaseButton(Button.LEFT)
  // console.log(currentMousePostition);
  console.log('analyzing position');
  await sleep(5000)
  console.log('next move predicted');
  await mouse.move(straightTo({ x: 932, y: 936 }));
  console.log(currentMousePostition);
  await mouse.drag(straightTo({ x: 843, y: 724 }))
  console.log('analyzing position');
  await sleep(5200)
  console.log('next move predicted');
  await mouse.move(straightTo({ x: 652, y: 858 }));
  console.log(currentMousePostition);
  await mouse.drag(straightTo({ x: 659, y: 648 }))
  console.log('analyzing position');
  await sleep(50000)
})();
// { x: 652, y: 858 }
// { x: 659, y: 648 }
/*

  const windowRef = await getActiveWindow();
  const currentMousePostition = await mouse.getPosition();
  console.log('engine started !');
  // console.log(windowRef.title);
  console.log(windowRef.region);
  console.log(currentMousePostition);
  mouse.config.mouseSpeed = 1200;
  await mouse.move(straightTo({ x: 815, y: 60 }));
  await mouse.releaseButton(Button.LEFT)
  await mouse.click(Button.LEFT)
  await mouse.click(Button.LEFT)
  await mouse.releaseButton(Button.LEFT)
  await mouse.move(straightTo({ x: 821, y: 845 }));
  console.log(currentMousePostition);

  await mouse.drag(straightTo({ x: 835, y: 660 }))
  await mouse.click(Button.LEFT)
  await mouse.click(Button.LEFT)
  await mouse.releaseButton(Button.LEFT)
  console.log(currentMousePostition);
  console.log('analyzing position');

  await sleep(4000)
  console.log('next move predicted');
  await mouse.move(straightTo({ x: 932, y: 936 }));
  await mouse.drag(straightTo({ x: 843, y: 724 }))
*/