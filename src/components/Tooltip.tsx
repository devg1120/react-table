
import {css} from "@emotion/react"
import {useState} from "react"

export const Tooltip = ({message, children, offset, vertical, horizontal}) => {
  const [isShow, setIsShow] = useState(false)
  const handleShow = () => {
    setIsShow(true)
  }

  const handleHide = () => {
    setIsShow(false)
  }

  return (
    <div
      css={TooltipWrap}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
    >
      <div css={TooltipContent(isShow, vertical, horizontal, offset)}>
        {message}
      </div>
      {children}
    </div>
  )
}

const TooltipWrap = css({
  position: "relative"
})

const TooltipContent = (
  isShow,
  vertical = "top",
  horizontal = "center",
  offset = 0
) =>
  css({
    position: "absolute",
    color: "#fff",
    background: "#000",
    padding: "4px 8px",
    borderRadius: 4,
    visibility: isShow ? "visible" : "hidden",
    maxWidth: 280,
    width: "max-content",

    ...(vertical === "top" &&
      horizontal === "center" && {
        bottom: `calc(100% + ${offset}px + 4px)`,
        left: "50%",
        transform: "translateX(-50%)",
        "&::after": {
          content: "''",
          width: 8,
          height: 4,
          position: "absolute",
          backgroundColor: "#000",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%, 50% 100%)"
        }
      }),

    ...(vertical === "top" &&
      horizontal === "left" && {
        bottom: `calc(100% + ${offset}px + 4px)`,
        right: "calc(50% - 12px)",
        "&::after": {
          content: "''",
          width: 8,
          height: 4,
          position: "absolute",
          backgroundColor: "#000",
          top: "100%",
          right: 8,
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%, 50% 100%)"
        }
      }),

    ...(vertical === "top" &&
      horizontal === "right" && {
        bottom: `calc(100% + ${offset}px + 4px)`,
        left: "calc(50% - 12px)",
        "&::after": {
          content: "''",
          width: 8,
          height: 4,
          position: "absolute",
          backgroundColor: "#000",
          top: "100%",
          left: 8,
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%, 50% 100%)"
        }
      }),

    ...(vertical === "middle" &&
      horizontal === "left" && {
        top: "50%",
        transform: "translateY(-50%)",
        right: `calc(100% + ${offset}px + 4px)`,
        "&::after": {
          content: "''",
          width: 4,
          height: 8,
          position: "absolute",
          backgroundColor: "#000",
          top: "50%",
          transform: "translateY(-50%)",
          left: "100%",
          clipPath: "polygon(0% 0%, 100% 50%, 100% 50%, 0% 100%)"
        }
      }),

    ...(vertical === "middle" &&
      horizontal === "right" && {
        top: "50%",
        transform: "translateY(-50%)",
        left: `calc(100% + ${offset}px + 4px)`,
        "&::after": {
          content: "''",
          width: 4,
          height: 8,
          position: "absolute",
          backgroundColor: "#000",
          top: "50%",
          transform: "translateY(-50%)",
          right: "100%",
          clipPath: "polygon(0% 50%, 100% 0%, 100% 100%, 0% 50%)"
        }
      }),

    ...(vertical === "bottom" &&
      horizontal === "left" && {
        top: `calc(100% + ${offset}px + 4px)`,
        right: "calc(50% - 12px)",
        "&::after": {
          content: "''",
          width: 8,
          height: 4,
          position: "absolute",
          backgroundColor: "#000",
          bottom: "100%",
          right: 8,
          clipPath: "polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)"
        }
      }),

    ...(vertical === "bottom" &&
      horizontal === "center" && {
        top: `calc(100% + ${offset}px + 4px)`,
        left: "50%",
        transform: "translateX(-50%)",
        "&::after": {
          content: "''",
          width: 8,
          height: 4,
          position: "absolute",
          backgroundColor: "#000",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          clipPath: "polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)"
        }
      }),

    ...(vertical === "bottom" &&
      horizontal === "right" && {
        top: `calc(100% + ${offset}px + 4px)`,
        left: "calc(50% - 12px)",
        "&::after": {
          content: "''",
          width: 8,
          height: 4,
          position: "absolute",
          backgroundColor: "#000",
          bottom: "100%",
          left: 8,
          clipPath: "polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)"
        }
      })
  })


