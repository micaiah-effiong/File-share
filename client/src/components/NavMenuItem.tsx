import { FunctionalComponent, PropType, HTMLAttributes, VNodeProps } from "vue";

type Tprop = {
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
  text: string;
};

function NavMenuItem(props: Tprop) {
  const Icon: FunctionalComponent<HTMLAttributes & VNodeProps> = props.icon;
  return (
    <div className=" grid justify-items-center gap-2 hover:text-ash-light hover:nav-highlight">
      <Icon class="w-5" />
      <span className="text-xs uppercase">{props.text}</span>
    </div>
  );
}

export default NavMenuItem;
