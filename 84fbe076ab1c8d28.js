const _1 = (md) => {
return (
md`# Test embed`
)
};

const _3 = (FileAttachment) => {
const world = FileAttachment("world.json").json()
return {world};
};

const _4 = async () => {
const viz = await import("https://cdn.jsdelivr.net/npm/geoviz@1/lite/+esm");

return {viz};
};

const _10 = (view,Inputs) => {
let k = view(Inputs.range([10,100], {step:1, value:50}))
return {k};
};

const _13 = () => {

};

const _5 = (viz,world,k,display) => {
let svg = viz.create({projection: "EqualEarth"});
svg.outline();
svg.graticule({step: 30, stroke: "white"});
svg.path({datum: world, fill: "white", fillOpacity: 0.3});
svg.prop({data: world, var: "pop", fill: "red", fillOpacity: 0.8, k});
display(svg.render());
return {svg};
};

export default function define(runtime) {
  const main = runtime.module();
  main.builtin("display", (_) => _);
  main.builtin("view", (_) => _.value);
  const fileAttachments = new Map([
    ["world.json", {url: "./world.json", mimeType: "application/json", lastModified: 1791962395111, size: 278391}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments((name) => fileAttachments.get(name)));
  main.define("cell 1", ["md"], _1);
  main.define("cell 3", ["FileAttachment"], _3);
  main.define("world", ["cell 3"], (_) => _.world);
  main.define("cell 4", [], _4);
  main.define("viz", ["cell 4"], (_) => _.viz);
  main.define("cell 10", ["view","Inputs"], _10);
  main.define("k", ["cell 10"], (_) => _.k);
  main.define("cell 13", [], _13);
  main.define("cell 5", ["viz","world","k","display"], _5);
  main.define("svg", ["cell 5"], (_) => _.svg);
  return main;
}
