import { HelpOutline } from "@mui/icons-material";
import {
    Grid,
    Typography,
    Box,
    Skeleton,
    Tooltip,
    IconButton,
    CardContent,
    Card,
    Icon,
    SvgIcon,
} from "@mui/material";
import React from "react";
import { NodeMonitor } from "../../types/NodeMonitor";
import NodeStatus from "../../types/NodeStatus";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import wallet from "../../assets/wallet.svg";
import { width } from "@mui/system";
type Props = {
    nodeStatus: NodeStatus | undefined;
    nodeMonitor: NodeMonitor | undefined;
};
const NodeStakingInfoCard = (props: Props) => {
    return (
        <React.Fragment>
            <Typography variant="subtitle2" sx={{ ml: 2, mt: 1 }}>
                Stacking
            </Typography>
            <Card
                sx={{
                    height: {
                        xs: "350px",
                        sm: "250px",
                        md: "250px",
                        lg: "200px",
                        xl: "200px",
                    },
                    borderRadius: 4,
                    overflow: "auto",
                }}
            >
                <CardContent>
                    <Grid container spacing={2} sx={{ mx: "0" }}>
                        <Grid
                            item
                            sx={{
                                direction: "row",
                                justifyItems: "center",
                                justifyContent: "center",
                            }}
                            xs={12}
                            sm={6}
                            md={12}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <img
                                        src={wallet}
                                        width="40"
                                        alt="React Logo"
                                        style={{ marginLeft: 3 }}
                                    />
                                    <Typography variant="subtitle2" width="30%" marginLeft={3}>
                                        Wallet Balance:
                                    </Typography>
                                    
                                    <Typography
                                        variant="h6"
                                        marginLeft={5}
                                    >
                                        {props.nodeMonitor?.wallet_infos
                                            ?.Final_rolls ?? (
                                            <Skeleton />
                                        )}
                                    </Typography>
                                    <Tooltip title="The Massa blockchain is divided in 32 Threads that are running in parallel.">
                                        <IconButton sx={{ p: 0, ml: 5 }}>
                                            <HelpOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <img
                                        src={wallet}
                                        width="40"
                                        alt="React Logo"
                                        style={{ marginLeft: 3 }}
                                    />
                                    <Typography variant="subtitle2" width="30%" marginLeft={3}>
                                        Active Rolls:
                                    </Typography>
                                    
                                    <Typography
                                        variant="h6"
                                        marginLeft={5}
                                    >
                                        {props.nodeMonitor?.wallet_infos
                                            ?.Final_rolls ?? (
                                            <Skeleton />
                                        )}
                                    </Typography>
                                    <Tooltip title="The Massa blockchain is divided in 32 Threads that are running in parallel.">
                                        <IconButton sx={{ p: 0, ml: 5 }}>
                                            <HelpOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <img
                                        src={wallet}
                                        width="40"
                                        alt="React Logo"
                                        style={{ marginLeft: 3 }}
                                    />
                                    <Typography variant="subtitle2" width="30%" marginLeft={3}>
                                        Balance Rolls:
                                    </Typography>
                                    
                                    <Typography
                                        variant="h6"
                                        marginLeft={5}
                                    >
                                        {props.nodeMonitor?.wallet_infos
                                            ?.Final_rolls ?? (
                                            <Skeleton />
                                        )}
                                    </Typography>
                                    <Tooltip title="The Massa blockchain is divided in 32 Threads that are running in parallel.">
                                        <IconButton sx={{ p: 0, ml: 5 }}>
                                            <HelpOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default NodeStakingInfoCard;
