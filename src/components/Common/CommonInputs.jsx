export const CommonInputs = ({
  user: { bio, facebook, instagram, youtube, twitter },
  handleChange,
  showSocialLinks,
  setShowSocialLinks,
}) => {
  return (
    <>
      <div>
        <label htmlFor="bio">bio</label>
        <textarea
          required
          name="bio"
          value={bio}
          onChange={handleChange}
          placeholder="bio"
        />

        <button onClick={() => setShowSocialLinks(!showSocialLinks)}>
          Add Social Links
        </button>

        {showSocialLinks && (
          <>
            <div>
              <label htmlFor="facebook">facebook</label>
              <input
                type="text"
                name="facebook"
                value={facebook}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="twitter">twitter</label>
              <input
                type="text"
                name="twitter"
                value={twitter}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="instagram">instagram</label>
              <input
                type="text"
                name="instagram"
                value={instagram}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="youtube">youtube</label>
              <input
                type="text"
                name="youtube"
                value={youtube}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
