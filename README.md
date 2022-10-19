# Benckmark for Chicken Slaughterer Blockchain Network

> *Soon will update this chapter*

## Result

Benchmark result for all rounds are available on the [results folder](tree/v1.0.0/results).

## Re-run the Benchmark

> *Soon will update this chapter*

### Prerequisite

> *Soon will update this chapter*

### Instalation

> *Soon will update this chapter*

### Run Benchmark Command

command format:

```bash
npx caliper launch manager \
--caliper-workspace ./ \
--caliper-flow-only-test \
--caliper-report-precision 4 \
--caliper-networkconfig [NETWORK CONFIGURATION FILE PATH] \
--caliper-benchconfig [BENCHMARK CONFIGURATION FILE PATH] \
--caliper-report-path [REPORT OUTPUT FILE PATH].html
```

example:

```bash
npx caliper launch manager \
--caliper-workspace ./ \
--caliper-flow-only-test \
--caliper-report-precision 4 \
--caliper-networkconfig networks/user1@supp2.yaml \
--caliper-benchconfig benchmarks/1createAsset-FixedRate.yaml \
--caliper-report-path reports/createAsset-FixedRate.html
```
