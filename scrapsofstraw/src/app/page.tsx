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
    for (let i = 0; i < 50; i++) {
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
    const ground = Bodies.rectangle(200, 625, 400, 200, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    // Add the boxes and the ground to the world
    World.add(engine.world, [boy, girl, ...boxes, ...draggableObjects, ground]);

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
    const removalY = 600; // y座標の閾値
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
        <div className='absolute w-full h-[250px] left-1/2 -translate-x-1/2 top-0 bg-slate-200 -z-10' ></div>
        <div className='absolute w-full h-[273px] left-1/2 -translate-x-1/2 bottom-0 bg-slate-200 -z-10' ></div>
        <p className='absolute w-[380px] h-[800px] overflow-y-scroll left-0 top-0 pt-[260px] px-[3.8rem] py-[80rem] text-xs text-black bg-slate-200 -z-20 ' >
          こんにちは！　もしくはこんばんわ？<br />
          <br />
          お手紙ありがとうございます。<br />
          そして、イベント含め、貴重な機会をくださって本当にありがとうございました。<br />
          改めて感謝を伝えさせてください。<br />
          <br />
          僕も下山さんみたいに洒落た手紙を書いて圧倒的な文才を見せつけようと試みましたが、そうして格好をつけても格好がつかないなと思い直しまして、キテレツな感じでお茶を濁すことにしました。お許しください。<br />
          <br />
          さて。<br />
          イベントを振り返ってみて、自分の中の進歩的で享楽的な部分が岩田さんのアイデアと、実存的で拭えないものが瀬尾さんのアイデアと繋がっているなと感じました。<br />
          どちらの要素も一側面として人々の中には在って、それを下山さんが散文的にでも纏めてくれていたことで、考えの取っ掛かりができたと思います。とても助かりました。<br />
          「対立していないんだ」という思いがとても伝わってきて、方向性をそのままに最後のピースを嵌めるだけでした。それがなかったら全然深堀りした質問ができなかった気がします。<br />
          そう考えると最初にお2人を登壇させようと考えた下山さんはいい意味で狂ってるなと思いました。<br />
          <br />
          改めてお手紙、書いてくださってありがとうございます。<br />
          本当さがある、と書かれたのを見たとき、大変な嬉しさがありました。<br />
          何というか、ここ数年ずっとそう在りたいと思ってきたことだったので、実的にはそうでなかったとしても、そのように見えるのはよかったです。（でも、偽りや虚栄心も実と捉えるべきでは？とか最近思い出し始めてますし、かと言ってその思考のまま先鋭相対主義者になるのも違うなと思うので、自分でも全然よくわかってないのですが）<br />
          <br />
          あと、藁くずの話です。<br />
          最初は正直困惑しましたが、藁くずというのはまさに言い得て妙で、"藁くず"が"藁くず"それ自体の集合体である、"藁くず"はどこまで結合を切って細分化しても"藁くず"であるという点も含めて、面白い気づきを得たなと思いました。<br />
          僕は最近、重い腰を上げてあさのあつこ作『バッテリー』を読みました。<br />
          野球の才能を持つ主人公と対照的に、そこに登場する主人公の弟、青波君が、主人公の意地みたいなものに押し出されて、自分自身を抉っていくようなものを読んでいて感じます。<br />
          草葉の陰、と言いますがそれは、どこかに大きな草木があるわけではなくて、誰某の関係性の中に必ず存在している。<br />
          藁くずが一塊ではない以上、仮にそれをつまみ上げてみても、取り切れない重箱の隅にあるような藁残りがあって、それに苦しむ人がいる。<br />
          そう考えると、自分が"抑圧された歴史"とか"崩壊"とかが好きなのにも繋がってくるような気がしましたし、改めてそうした人を見続けていきたいなと思った機会でした。<br />
          一意の物語の裏にある数多の悲哀と呵責の物語があって、でもそれを見ている人が居るんだよ、というのを僕は求めている気がします。<br />
          もしかしたらその行為によって自分が救われたいのかな？とか思ったり。わかんないですね。<br />
          <br />
          何を言いたかったのか分からなくなってしまいました。忘れてください。<br />
          <br />
          僕も下山さんのことは全然分かってませんが、真剣に愉しさ、哀しさを探求することができる素敵な方だなというのが通算数日間の関わりだけで伝わってきました。<br />
          願わくば、これからも遊学生やら何やらで関われたらいいなと思っています。"編集"についてもぜひ、詳しく教えてください。<br />
          これから段々と暑くなりますが、コンクリートジャングルに吹く熱風に負けないよう、そして、その色彩豊かな眼の感受性を一層輝かせるよう、どうぞご自愛ください。<br />
          今後ともよろしくお願いします。<br />
          <br />
          るつぼの中にあるものを全部ぶちまけて　明石<br />
        </p>
        </div>
        
      </div>
      <div className="fixed w-full h-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0">
        
      </div>
    </main>
  );
};

export default Page;
