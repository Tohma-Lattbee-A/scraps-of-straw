'use client'
import React, { useEffect, useRef } from 'react';
import Matter, { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } from 'matter-js';

const Page: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 360,
        height: 800,
        wireframes: false,
        background: 'transparent',
      },
    });

    //#region boy and girl
    const boy = Bodies.rectangle(15, 300, 80, 80, {
      isStatic: true,
      render: {
        sprite: {
          texture: '/boy.svg', // 画像のパス
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });

    const girl = Bodies.rectangle(355, 300, 80, 80, {
      isStatic: true,
      render: {
        sprite: {
          texture: '/girl.svg', // 画像のパス
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });
    //#endregion

    //#region straws
    const straws = [];
    for (let i = 0; i < 150; i++) {
      const straw = Bodies.circle(200, 650 - i * 10, 23, {
        render: {
          sprite: {
            texture: '/straw.svg', // 画像のパス
            xScale: 0.18,
            yScale: 0.18,
          },
        },
      });
      straws.push(straw);
    }

    const ebichili = Bodies.circle(200, 500, 12, {
      render: {
        sprite: {
          texture: '/ebichili.svg', // 画像のパス
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    });

    const katsuo = Bodies.circle(200, 500, 12, {
      render: {
        sprite: {
          texture: '/katsuo.svg', // 画像のパス
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    });

    const hre = Bodies.circle(200, 500, 12, {
      render: {
        sprite: {
          texture: '/hre.svg', // 画像のパス
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    });

    const auhun = Bodies.circle(200, 500, 12, {
      render: {
        sprite: {
          texture: '/auhun.svg', // 画像のパス
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    });

    const specials = [ebichili, katsuo, hre, auhun];
    //#endregion

    //#region boxes
    const box00 = Bodies.rectangle(400, 300, 150, 450, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box01 = Bodies.polygon(310, 155, 3, 77, {
      angle: -15,
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box02 = Bodies.polygon(360, 350, 3, 120, {
      angle: 56.1,
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box03 = Bodies.rectangle(285, 265, 15, 100, {
      angle: 21.1,
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box04 = Bodies.polygon(250, 240, 10, 30, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box10 = Bodies.rectangle(-15, 300, 100, 450, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box11 = Bodies.polygon(0, 420, 5, 70, {
      angle: -15,
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box12 = Bodies.polygon(0, 130, 10, 65, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box13 = Bodies.rectangle(40, 240, 50, 110, {
      angle: 19.6,
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const box14 = Bodies.rectangle(40, 240, 10, 350, {
      angle: 19.5,
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const boxes = [box00, box01, box02, box03, box04, box10, box11, box12, box13, box14];
    //#endregion

    const draggableObjects = [...specials, ...straws];

    // Create a ground
    const ground = Bodies.rectangle(200, 870, 400, 200, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const wallL = Bodies.rectangle(-25, 470, 50, 700, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const wallR = Bodies.rectangle(385, 470, 50, 700, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });


    // Add the boxes and the ground to the world
    World.add(engine.world, [ground, wallL, wallR, boy, girl, ...boxes, ...draggableObjects]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.world, mouseConstraint);

    // Add event listener to remove objects below a certain y-coordinate
    const removalY = 1000; // y座標の閾値
    Events.on(engine, 'afterUpdate', () => {
      const objectsToRemove = engine.world.bodies.filter(body => body.position.y > removalY && !body.isStatic);
      objectsToRemove.forEach(body => {
        World.remove(engine.world, body);
      });
    });

    Engine.run(engine);
    Render.run(render);

    // Cleanup on unmount
    return () => {
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);


  return (
    <main className='flex items-center justify-center h-full w-full bg-slate-200'>
      <div ref={sceneRef} className="fixed w-[360px] h-[800px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
        <div>
          <p className='absolute left-1 top-[18rem] text-gray-400 font-thin'>me</p>
          <p className='absolute right-3 top-[19.5rem] text-right text-gray-400 font-thin'>u,<br />world,<br />anything</p>
          <img src='/letter.png' className='absolute top-[0.6rem] -z-10'></img>
        </div>
      </div>
      <div className="fixed w-full h-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0">
        
      </div>
    </main>
  );
};

export default Page;
