import Button from "@/components/CustomUI/Button";
import CountDown from "@/components/CustomUI/CountDown";
import TextWave from "@/components/CustomUI/TextWave";

export default function Home() {
  return (
    <div className="p-4 absolute top-0">
      <h1 className="font-poppins text-[2em]">Font Poppins : Epitome 2k24</h1>
      <h1 className="font-nulshock text-[2em]">
        Font NullShock : Epitome 2k24
      </h1>
      <h1 className="font-vulgar text-[2em]">Font Vulgar : Epitome 2k24</h1>
      <h1 className="font-valorant text-[2em]">Font Valorant : Epitome 2k24</h1>
      <h1 className="font-beyonders text-[2em]">
        Font Beyonders : Epitome 2k24
      </h1>
      <h1 className="font-spaceAge text-[2em]">
        Font Space Age : Epitome AIMIT
      </h1>

      <TextWave text="Epitome AIMIT" />
      <Button value="Sign Up" />
      <CountDown />
    </div>
  );
}
