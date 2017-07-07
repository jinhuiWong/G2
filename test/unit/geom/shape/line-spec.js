const expect = require('chai').expect;
const { Canvas } = require('@ali/g');
const Line = require('../../../../src/geom/shape/line');
const Coord = require('../../../../src/coord/');
const Global = require('../../../../src/global');

const div = document.createElement('div');
div.id = 'csl';
document.body.appendChild(div);

const coord = new Coord.Cartesian({
  start: {
    x: 0,
    y: 500
  },
  end: {
    x: 500,
    y: 0
  }
});
const canvas = new Canvas({
  containerId: 'csl',
  width: 500,
  height: 500
});

describe('line shapes', function() {
  Line._coord = coord;
  describe('default', function() {
    it('default shape type', function() {
      expect(Line.defaultShapeType).to.be.equal('line');
    });
  });
  describe('line', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 200, 200 ]);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin',
        opacity: 0.8
      };

      const pointCfg = Line.getMarkerCfg(undefined, point);
      expect(pointCfg.opacity).to.be.equal(0.8);
      expect(pointCfg.lineWidth).to.be.equal(30);
      expect(pointCfg.symbol(10, 10, 5)).eql([
        [ 'M', 5, 10 ],
        [ 'L', 15, 10 ]
      ]);
    });

    it('getActiveCfg', function() {
      const activeCfg = Line.getActiveCfg();
      expect(activeCfg).eql({
        lineWidth: 4 / 2
      });
    });
  });

  describe('line has size', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red',
        size: 10
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineWidth')).eql(10);

    });
  });

  describe('line point.y = []', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points = [
        { x: 100, y: [ 100, 200 ] },
        { x: 200, y: [ 200, 300 ] }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 200 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 200, 300 ]);
    });
  });

  describe('line point.x = [], point.y = []', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points = [
        { x: [ 100, 50 ], y: [ 100, 200 ] },
        { x: [ 200, 80 ], y: [ 200, 300 ] }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eql([ 'M', 50, 200 ]);
      expect(shape.attr('path')[1]).eql([ 'L', 80, 300 ]);
      expect(shape.attr('path')[2]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[3]).eqls([ 'L', 200, 200 ]);

    });
  });

  describe('dot', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'dot';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([ 2, 1 ]);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin'
      };

      const pointCfg = Line.getMarkerCfg('dot', point);

      expect(pointCfg.lineDash).eql([ 2, 1 ]);
      expect(pointCfg.symbol(10, 10, 5)).eql([
        [ 'M', 5, 10 ],
        [ 'L', 15, 10 ]
      ]);
    });
  });

  describe('dash', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'dash';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([ 10, 5 ]);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin'
      };

      const pointCfg = Line.getMarkerCfg('dash', point);

      expect(pointCfg.lineDash).eql([ 10, 5 ]);
      expect(pointCfg.symbol(10, 10, 5)).eql([
        [ 'M', 5, 10 ],
        [ 'L', 15, 10 ]
      ]);
    });
  });

  describe('smooth && spline', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'smooth';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
        { x: 50, y: 50 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(7);
      expect(shape.attr('path')[2].length).eql(7);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord
      };

      const pointCfg = Line.getMarkerCfg('smooth', point);
      const splinePointCfg = Line.getMarkerCfg('spline', point);

      expect(pointCfg).eql(splinePointCfg);
      expect(pointCfg.lineWidth).to.be.equal(30);
      expect(pointCfg.stroke).to.be.equal(Global.defaultColor);

    });
  });

  describe('hv', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hv';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];

      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 200, 100 ]);
      expect(shape.attr('path')[2]).eqls([ 'L', 200, 200 ]);
    });
  });

  describe('vh', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'vh';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);

      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 100, 200 ]);
      expect(shape.attr('path')[2]).eqls([ 'L', 200, 200 ]);
    });
  });

  describe('hvh', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hvh';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];

      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      console.log(shape.attr('path'));
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 150, 100 ]);
      expect(shape.attr('path')[2]).eqls([ 'L', 150, 200 ]);
      expect(shape.attr('path')[3]).eqls([ 'L', 200, 200 ]);
    });
  });
  describe('vhv', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'vhv';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
    });
    it('hv vh hvh vhv getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord
      };

      const pointCfg = Line.getMarkerCfg('hv', point);
      const vhPointCfg = Line.getMarkerCfg('vh', point);
      const hvhPointCfg = Line.getMarkerCfg('hvh', point);
      const vhvPointCfg = Line.getMarkerCfg('vhv', point);

      expect(pointCfg.symbol(2, 2, 2)).eql([
        [ 'M', 0, 0 ],
        [ 'L', 2, 0 ],
        [ 'L', 2, 2 ],
        [ 'L', 4, 2 ]
      ]);
      expect(vhPointCfg.symbol(2, 2, 2)).eql([
        [ 'M', 0, 2 ],
        [ 'L', 2, 2 ],
        [ 'L', 2, 0 ],
        [ 'L', 4, 0 ]
      ]);
      expect(hvhPointCfg.symbol(2, 2, 2)).eql([
        [ 'M', -1, 2 ],
        [ 'L', 1, 2 ],
        [ 'L', 1, 1 ],
        [ 'L', 3, 1 ],
        [ 'L', 3, 2 ],
        [ 'L', 5, 2 ]
      ]);
      expect(vhvPointCfg.symbol(2, 2, 2)).eql([
        [ 'M', 0, 2 ],
        [ 'L', 0, 1 ],
        [ 'L', 2, 1 ],
        [ 'L', 2, 0 ],
        [ 'L', 2, 3 ],
        [ 'L', 4, 3 ]
      ]);
    });

    it('clear', function() {
      canvas.destroy();
      document.body.removeChild(div);
    });
  });

});
