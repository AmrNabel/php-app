import { Skeleton, styled, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getModuleId } from "helper-functions/getModuleId";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives/encoding";
import Link from "next/link";
import { useState } from "react";
import { textWithEllipsis } from "styled-components/TextWithEllipsis";
import CustomImageContainer from "../CustomImageContainer";

const Wrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  width: "122px",
  height: "183px",
  backgroundColor: theme.palette.background.default,
  borderRadius: "60px",
  transition: "all ease 0.5s",
  "&:hover": {
    boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
    img: {
      transform: "scale(1.1)",
    },
    borderRadius: "60px 60px 55px 55px",
  },
  [theme.breakpoints.down("md")]: {
    width: "100px",
    height: "140px",
    boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "60px 60px 0px 0px",

  [theme.breakpoints.down("md")]: {
    height: "80px",
  },
}));
const TextWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "3px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    padding: "10px 12px",
  },
}));

const PharmacyCategoryCard = (props) => {
  const { image, title, id, onlyshimmer, slug } = props;
  const classes = textWithEllipsis();
  const [hover, setHover] = useState(false);

  return (
    <>
      {onlyshimmer ? (
        <Wrapper
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Skeleton
            width="100%"
            height="50%"
            variant="rectangle"
            sx={{ borderRadius: "60px 60px 0px 0px" }}
          />
          <TextWrapper>
            <Skeleton width="70px" variant="text" />
          </TextWrapper>
        </Wrapper>
      ) : (
        <Link
          href={{
            pathname: "/home",
            query: {
              search: "category",
              id: id,
              module_id: `${getModuleId()}`,
              name: btoa(title),
              data_type: "category",
            },
          }}
        >
          <Wrapper
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <ImageWrapper>
              <CustomImageContainer
                src={image}
                alt={title}
                height="100%"
                width="100%"
                borderRadius="60px 60px 0px 0px"
                objectFit="cover"
                loading="loading"
              />
            </ImageWrapper>
            <Tooltip
              title={title}
              placement="bottom"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: (theme) => theme.palette.toolTipColor,
                    "& .MuiTooltip-arrow": {
                      color: (theme) => theme.palette.toolTipColor,
                    },
                  },
                },
              }}
            >
              <TextWrapper>
                <Typography
                  textAlign="center"
                  // className={classes.multiLineEllipsis}
                  maxHeight="20px"
                  color={hover && "primary.main"}
                  noWrap
                  component="h4"
                >
                  {title}
                </Typography>
              </TextWrapper>
            </Tooltip>
          </Wrapper>
        </Link>
      )}
    </>
  );
};

PharmacyCategoryCard.propTypes = {};

export default PharmacyCategoryCard;
