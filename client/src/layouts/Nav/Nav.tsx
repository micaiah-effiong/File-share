import {
  withModifiers,
  defineComponent,
  DefineComponent,
  Component,
  ref,
} from "vue";
import { DocumentIcon } from "@heroicons/vue/solid";
import {
  FolderIcon,
  HomeIcon,
  CogIcon,
  VideoCameraIcon,
  PhotographIcon,
  RssIcon,
} from "@heroicons/vue/outline";
import NavMenuItem from "../../components/NavMenuItem";

function Nav() {
  return (
    <nav className="h-full w-32 py-7 bg-white">
      <div className="grid gap-6">
        <div className="text-ocean-blue-dark flex justify-center">
          <RssIcon class="w-10" />
        </div>
        <div className="grid gap-8 text-md text-ocean-blue-dark">
          <div className=" grid justify-items-center gap-2 hover:text-ash-light hover:nav-highlight">
            <HomeIcon class="w-5" />
            <span className="text-xs uppercase">home</span>
          </div>

          <div className="grid justify-items-center gap-2 hover:text-ash-light hover:nav-highlight">
            <FolderIcon class="w-5" />
            <span className="text-xs uppercase">Recent</span>
          </div>
          <div className="grid justify-items-center gap-2 hover:text-ash-light hover:nav-highlight">
            <VideoCameraIcon class="w-5" />
            <span className="text-xs uppercase">video</span>
          </div>
          <div className="grid justify-items-center gap-2 hover:text-ash-light hover:nav-highlight">
            <PhotographIcon class="w-5" />
            <span className="text-xs uppercase">phote</span>
          </div>
          <div className="grid justify-items-center gap-2 hover:text-ash-light hover:nav-highlight">
            <CogIcon class="w-5" />
            <span className="text-xs uppercase">settings</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
