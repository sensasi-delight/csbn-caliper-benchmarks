# Benckmark for Chicken Slaughterer Blockchain Network

## Fixed feedback rate

```bash
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/fixedFeedbackRate.yaml --caliper-flow-only-test
```

## Fixed load

```bash
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/fixedLoad.yaml --caliper-flow-only-test
```

## Fixed rate

```bash
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/fixedRate.yaml --caliper-flow-only-test
```

## linear rate

```bash
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/linearRate.yaml --caliper-flow-only-test
```

## Maximum rate

```bash
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/maximumRate.yaml --caliper-flow-only-test
```
