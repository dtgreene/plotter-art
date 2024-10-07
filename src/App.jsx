import { DownloadIcon, ExpandIcon } from "lucide-react";

import checkerboardCircle from "./svg/circle-checkered";
import squares3D from "./svg/squares-3d";
import kebabCase from "kebab-case";

const serializer = new XMLSerializer();
const importMeta = [
  {
    name: "Checkerboard Circle",
    func: checkerboardCircle,
  },
  {
    name: "Squares 3D",
    func: squares3D,
  },
];

const data = importMeta.map(({ name, func }) => {
  const __html = serializer.serializeToString(func());
  const blob = new Blob([__html], { type: "image/svg+xml" });
  const downloadURL = URL.createObjectURL(blob);

  return {
    name,
    downloadURL,
    downloadName: kebabCase(name, false),
    __html,
  };
});

export const App = () => {
  return (
    <div className="p-12 flex justify-center">
      <div className="max-w-[1200px]">
        <div className="text-2xl mb-8">Plotter Art</div>
        <div className="flex gap-8 flex-wrap">
          {data.map(({ name, downloadURL, downloadName, __html }) => {
            const handleExpandClick = () => {
              window.open(downloadURL);
            };

            return (
              <div
                key={name}
                className="overflow-hidden flex-shrink-0 border rounded-md border-zinc-600 relative"
              >
                <div className="bg-zinc-950 border-b border-b-zinc-600 p-2">
                  <span className="text-zinc-300 text-xl text-ellipsis overflow-hidden whitespace-nowrap">
                    {name}
                  </span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html }}
                  className="svg-wrapper w-[250px] h-[250px] p-4"
                />
                <div className="absolute right-2 bottom-2 flex gap-2">
                  <button
                    className="border border-zinc-600 p-2 hover:opacity-60 transition-opacity block cursor-pointer"
                    onClick={handleExpandClick}
                  >
                    <ExpandIcon width="32" height="32" />
                  </button>
                  <a
                    className="border border-zinc-600 p-2 hover:opacity-60 transition-opacity block cursor-pointer"
                    href={downloadURL}
                    download={downloadName}
                  >
                    <DownloadIcon width="32" height="32" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
