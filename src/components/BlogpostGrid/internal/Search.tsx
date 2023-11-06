import {
  MenuItem,
  Typography,
  FormLabel,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@/icons/icons-jsx/control/IcSearch";
import { t } from "@lingui/macro";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { makeStyles } from "@/components/style-utils";
import { SchemaTypes } from "@datocms/cma-client-browser";

const useStyles = makeStyles()((theme) => ({
  label: {
    color: theme.palette.monochrome[800],
    fontSize: "18px!important",
    marginBottom: "8px",
  },
}));

/**
 * Replaces all occurrences of highlighted text in a string with the provided highlight string.
 *
 * @param {string} string - The input string to be processed.
 * @param {string} highlight - The string to be used as the highlight.
 * @return {string} The modified string with the highlighted text.
 */
function highlightMatches(string: string, highlight: string) {
  return string.replace(/\[h\](.+?)\[\/h\]/g, function (_a, b) {
    const div = document.createElement("div");
    div.innerHTML = highlight;
    //@ts-ignore
    div.children[0].innerText = b;
    return div.children[0].outerHTML;
  });
}

interface Props {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  options: SchemaTypes.SearchResult[];
  onReset: () => void;
  showLabel?: boolean;
}

const Search = (props: Props) => {
  const { searchString, setSearchString, options, onReset, showLabel = true } = props;
  const { push } = useRouter();
  const { classes } = useStyles();
  return (
    <>
      {showLabel && (
        <FormLabel>
          <Typography variant="body1" className={classes.label}>
            <Trans id="search.label">Search</Trans>
          </Typography>
        </FormLabel>
      )}

      <Autocomplete
        id="search"
        getOptionLabel={(option) => option.attributes?.highlight.body?.[0] ?? ""}
        popupIcon={null}
        onInputChange={(e, value, reason) => {
          if (reason === "reset") {
            onReset?.();
          }
        }}
        renderOption={(props, option) => {
          if (option.attributes?.highlight.body?.[0]) {
            const highlight = highlightMatches(
              option.attributes?.highlight.body?.[0],
              "<strong></strong>"
            );
            return (
              <MenuItem
                {...props}
                key={option.id}
                sx={{ whiteSpace: "normal", height: "fit-content" }}
              >
                <span dangerouslySetInnerHTML={{ __html: highlight }} />
              </MenuItem>
            );
          }
        }}
        onChange={(_e, option) => {
          if (option?.attributes.url) {
            push(option?.attributes.url);
          }
        }}
        noOptionsText={t({ id: "search.noOptions", message: "No Options" })}
        options={options.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            variant="outlined"
            value={searchString}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width={24} height={24} color={"#596978"} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchString(e.target.value)}
          />
        )}
      />
    </>
  );
};

export default Search;
