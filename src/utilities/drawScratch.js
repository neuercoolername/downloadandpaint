export default function scratch  (ctx,xoff, yoff)  {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(127 + xoff, 261 + yoff);
    ctx.moveTo(8 + xoff, 51 + yoff);
    ctx.bezierCurveTo(
      8 + xoff,
      66 + yoff,
      -6 + xoff,
      86 + yoff,
      12 + xoff,
      70 + yoff
    );
    ctx.bezierCurveTo(
      23 + xoff,
      60 + yoff,
      42 + xoff,
      83 + yoff,
      31 + xoff,
      73 + yoff
    );
    ctx.bezierCurveTo(
      20 + xoff,
      63 + yoff,
      52 + xoff,
      53 + yoff,
      40 + xoff,
      62 + yoff
    );
    ctx.bezierCurveTo(
      28 + xoff,
      71 + yoff,
      54 + xoff,
      97 + yoff,
      46 + xoff,
      84 + yoff
    );
    ctx.bezierCurveTo(
      38 + xoff,
      71 + yoff,
      66 + xoff,
      48 + yoff,
      56 + xoff,
      59 + yoff
    );
    ctx.bezierCurveTo(
      46 + xoff,
      70 + yoff,
      56 + xoff,
      45 + yoff,
      55 + xoff,
      60 + yoff
    );
    ctx.bezierCurveTo(
      54 + xoff,
      75 + yoff,
      72 + xoff,
      25 + yoff,
      57 + xoff,
      22 + yoff
    );
    ctx.bezierCurveTo(
      42 + xoff,
      19 + yoff,
      58 + xoff,
      14 + yoff,
      45 + xoff,
      6 + yoff
    );
    ctx.bezierCurveTo(
      40 + xoff,
      3 + yoff,
      34 + xoff,
      35 + yoff,
      27 + xoff,
      22 + yoff
    );
    ctx.bezierCurveTo(
      20 + xoff,
      9 + yoff,
      20 + xoff,
      -2 + yoff,
      8 + xoff,
      7 + yoff
    );
    ctx.bezierCurveTo(
      -4 + xoff,
      16 + yoff,
      19 + xoff,
      39 + yoff,
      7 + xoff,
      48 + yoff
    );
    ctx.stroke();

    ctx.fill();
  };