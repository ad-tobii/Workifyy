import { FaMapPin, FaShield } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import Button from "../../../Components/Button";
import { Link } from "react-router-dom";

function Section() {
  return (
    <div className="mt-28 px-10 flex flex-col items-center gap-10 largeDesktop:flex-row largeDesktop:justify-center">
      <div>
        <img
          src="/assets/workers-svg.svg"
          className="vecimg xsMobile:mt-6 xsMobile:w-[15rem] miniMobile:w-[20rem] mobile:w-[25rem] miniTablet:w-[20rem]  tablet:w-[30rem] miniLaptop:w-[25rem] desktop:w-[35rem] laptop:w-[35rem] largeDesktop:w-[30rem]"
          alt=""
        />
      </div>

      <div className="flex flex-col  text-white">
        <h1 className=" pb-6 text-center text-3xl font-bold leading-relaxed  xsMobile:text-xl miniMobile:text-2xl miniTablet:text-2xl tablet:text-2xl">
          Workifyy your work game, it’s easy
        </h1>

        <div className="flex flex-col gap-8 ">
          {/* Section 1 */}
          <div className="flex items-start gap-4">
            <FaSignInAlt className="text-3xl text-[#32CD32]" />
            <div>
              <h2 className="text-xl font-bold">Easy Access, Big Results</h2>
              <p className="max-w-sm text-sm text-[#32CD32]">
                No stress, no charge. Sign up and discover skilled professionals
                who are ready to deliver quality work.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex items-start gap-4">
            <FaMapPin className="text-3xl text-[#32CD32]" />
            <div>
              <h2 className="text-xl font-bold">Post a Job & Get It Done</h2>
              <p className="max-w-sm text-sm text-[#32CD32]">
                Finding professionals doesn’t have to be a chore. Post your job,
                compare bids, and hire top talent in minutes.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex items-start gap-4">
            <FaShield className="text-3xl text-[#32CD32]" />
            <div>
              <h2 className="text-xl font-bold">
                Quality Work, Friendly Prices
              </h2>
              <p className="max-w-sm text-sm text-[#32CD32]">
                Work with verified professionals at rates you can afford. No
                hidden fees, no surprises—just the right price for the right
                job.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 pt-8">
          <Link to="/Signup">
            <Button
              name="Sign In"
              className="rounded border-2 border-[#32CD32] bg-[#32CD32] px-4 py-2.5 text-white duration-300 hover:bg-transparent hover:text-[#32CD32]"
            />
          </Link>

          <Link to="/">
            <Button
              name="Hire A Pro"
              className="rounded border-2 border-[#32CD32] bg-transparent px-4 py-2.5 text-[#32CD32] duration-300 hover:bg-[#32CD32] hover:text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Section;
