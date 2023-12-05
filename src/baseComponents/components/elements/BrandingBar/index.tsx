/** @jsxImportSource theme-ui */
import { ThemeUIStyleObject } from 'theme-ui'
import { COLOR } from '../../../theme/colors'

const ProvostImage =
  'data:image/png;base64,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'
const UniversityLogo =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlcAAABkCAMAAACclOWcAAAABGdBTUEAALGPC/xhBQAAADNQTFRF////////////////////////////////////////////////////////////AAAA////FbWC9gAAABB0Uk5TcI+vUM8w358gYO8Qf0C/AK6MYRQAAAmFSURBVHja7ZzrlqyqDoVVFOVavv/TbgFFLlGxu/qMM/ae80+v0hJD+AghWqv7QND31cEFELiCwBUEriAIXEHgCgJXEASuIHAFgSsIAlcQuILAFQSBKwhcQeAKgsAVBK4gcAVB4AoCVxC4giBwBYErCFxBELiCwBUEriAIXEHgCgJXEASuIHAFgSsIAlcQuPq/09R1C7wArr5MlR36VQKsfyFXyhjzPLCi/Ar7BgyT3JzVr/rnDRgz/c+s/Zl71de4WuyuwX3U+4fzTuHzvH8cwsc+mcPp5cEtxyH2SZqMvhI2k0iM0Xrej2pB+VaMqxOfk2N9fjcvK/N7jGscz6OD1sRrh0afS+cVQ8Sr3WiV36G03XrbVyvKsbux9iP00b++m+r4mam/sf307KDFdPm1sW5jqRtn1cj1uSWTi1dsdt2VwezFd3825yWml+48OxIMHr8bTNkv789Lls67kO8OXLqtgZmp84rBnR6dAVtjKSMz9xdaj09f+l9tzQ7GiO1LJk15eBiuZLw3e/z4uOObtj9nd7TvDtfq+DCLNq6GMNwLlXV5E3bXBxcm/vC3dT1lxt+Qs/zyG2s/nT8s/dHVlvc2ffBXuJxf274MfG/Hytj7OsZIqo19gDNPlA5fRDTf3UCEdZCfTvGf5mKm+XYPSxZ/War88nhoTByXt6hcg8HverXVhduZZcwa2KnbsPKX89wCb1/qqGUdPTXrPkQiHanP4jw7REsaqdpau4lry3p26cqF4Ua+Z+LTbK3rtVt6lftbx8oxnA3X367BMTgYx6hkxHec86lYNieB5Ri+EkB2mP9Rg7PIcWWjcT4slxmE7/E5ylm0+FSXn0M9xQ9SlTM0NlKsF3Y/4wdKV2NndoN0ZV/exyk/PmSntTu+7P9sXARdG+zmrHdRHPbShSLpzCQLsBqs1ceol4tr6nt9y1Xqcz86gkaPWky9w+Z8cO2HgORIGEiudMmNWWXasF0/j1wpmVwwVKlu2seR5MrH2vxUd04a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'

const sharedLinkStyle: ThemeUIStyleObject = {
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'block',
  height: '50px',
  lineHeight: '50px',
  overflow: 'hidden',
  textIndent: '-9999px',
}

const universityLogo: ThemeUIStyleObject = {
  ...sharedLinkStyle,
  backgroundImage: `url(${UniversityLogo})`,
  margin: '0 auto',
  position: 'relative',
  width: '300px',
  '@media screen and (min-width: 800px)': {
    left: '12px',
    margin: '0',
    position: 'absolute',
  },
  '@media screen and (min-width: 1212px)': {
    left: '0',
  },
}
const provostLogo: ThemeUIStyleObject = {
  ...sharedLinkStyle,
  backgroundImage: `url(${ProvostImage})`,
  display: 'none',
  '@media screen and (min-width: 800px)': {
    display: 'block',
    position: 'absolute',
    right: '12px',
    width: '227px',
  },
  '@media screen and (min-width: 1212px)': {
    right: '0',
  },
}
export const BrandingBar = () => {
  return (
    <hgroup
      sx={{
        backgroundColor: COLOR.ND_PROVOST_BLUE,
        height: '50px',
        display: 'block',
        a: {
          color: COLOR.TEXT_ON_PRIMARY,
          textDecoration: 'none',
        },
      }}
    >
      <div
        sx={{
          display: 'block',
          margin: '0 auto',
          maxWidth: '1200px',
          padding: '0',
          position: 'relative',
        }}
      >
        <nav
          aria-label="University of Notre Dame"
          sx={{
            boxSizing: 'border-box',
            display: 'block',
            height: '50px',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <a sx={universityLogo} href="http://nd.edu">
            University <i>of</i> Notre Dame
          </a>
          <a sx={provostLogo} href="http://provost.nd.edu">
            Office <i>of the</i> Provost
          </a>
        </nav>
      </div>
    </hgroup>
  )
}
