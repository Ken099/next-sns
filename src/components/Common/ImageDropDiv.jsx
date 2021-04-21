import { route } from "next/dist/next-server/server/router";
import { router, useRouter } from "next/router";

export const ImageDropDiv = ({
  highlighted,
  setHighlighted,
  inputRef,
  handleChange,
  mediaPreview,
  setMediaPreview,
  setMedia,
  profilePicUrl,
}) => {
  const router = useRouter();

  const signupRoute = router.pathname === "/signup";

  const checkForSignupPage = () =>
    signupRoute ? (
      <>
        <div>Drag n Drop or Click to upload image</div>
      </>
    ) : (
      <span>
        <img
          src={profilePicUrl}
          alt="Profile Picture"
          onClick={() => inputRef.current.click()}
        />
        Drag n Drop or Click to upload image
      </span>
    );

  return (
    <>
      <div action="">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="media"
          ref={inputRef}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setHighlighted(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setHighlighted(true);

            const droppedFile = Array.from(e.dataTransfer.files);
            setMedia(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }}
        >
          {mediaPreview === null ? (
            <>
              <div>{checkForSignupPage()}</div>
            </>
          ) : (
            <div>
              <img
                src={mediaPreview}
                onClick={() => inputRef.current.click()}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
