import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const MyComposition: React.FC = () => {
  return (
    <Composition
      id="JagaUsahaDemo"
      component={MainVideo}
      durationInFrames={11554}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
