---
title: Lie theoryとJacobian 1
date: '2021-01-05'
---

自分はVisual SLAMを作りたいと思い立ち[Basalt](https://gitlab.com/VladyslavUsenko/basalt)のコードを読み始めた。
するとなかなか理解できないLie群関係のJacobianがたくさん登場した。これらJacobianを導出するためいろいろと調査した。せっかくなので本ブログにまとめたい。

したがって、本記事ではBasaltに登場する再投影誤差$\boldsymbol{r}_{it}$のJacobianを導出するまでを説明したい。

導出するJacobian:
$$
\frac{D \boldsymbol{r}_{it}}{D T_{W C_t}},
\frac{D \boldsymbol{r}_{it}}{D T_{W C_h}},
\frac{D \boldsymbol{r}_{it}}{D _h\boldsymbol{m}_i},
$$

再投影誤差:
$$
\boldsymbol{r}_{it} = 
\pi ( T_{W C_t}^{-1} T_{W C_h} \boldsymbol{q}({}_h \boldsymbol{m}_i)) - \boldsymbol{z}_{it}
$$

これら式の記号の説明は本文内で行う。

もし、自分の間違った解釈や直したほうが良い表現を見つけた方は本ブログのリポジトリのIssueまで報告いただけるととてもありがたいです。コメント機能は組み込んでおりませんので…。

[Submit new issue](https://github.com/eryeden/eoee-blog/issues/new?labels=blog)

## Jacobian導出までのロードマップ
初めにBasaltでの問題設定を説明し下記ロードマップに従って書き進めていこうと思う。
![loadmap](./loadmap.png)


## Basaltの問題設定

Basaltには以下の特徴がある。
- ランドマークの位置はHostFrameで扱われる。HostFrameとはあるランドマークを初めて観測した画像のカメラ座標系のこと。
- ランドマーク位置はStereo graphic projectionされて保持される。多くの場合ランドマーク位置は世界座標系の座標として表現されるが、BasaltではHostFrameで表現したランドマーク位置をStereo graphic projectionして保持する。
- ランドマークは必ずどれかのフレームにHostされる。このランドマークをHostしていないが観測しているフレームのカメラ座標系をTargetFrameと呼ぶ。

上記特徴からBasaltにおける再投影誤差$\boldsymbol{r}_{it}$は以下のような式で表現される:
$$
\boldsymbol{r}_{it} = 
\pi ( T_{W C_t}^{-1} T_{W C_h} \boldsymbol{q}({}_h \boldsymbol{m}_i)) - \boldsymbol{z}_{it}
$$

記号の説明:
- $\boldsymbol{r}_{it}$ : ランドマーク$i$をTargetFrame $t$にて観測したときの再投影誤差。
- $\pi(\boldsymbol{p})$ : TargetFrame $t$で表現された位置$\boldsymbol{p}$をTargetFrameの画像平面に投影するカメラモデルを表現する関数。
- $T_{W C_t} \in SE(3)$ : TargetFrameから世界座標系への座標系変換。$_{C_t}\boldsymbol{p}$、$_{W}\boldsymbol{p}$をそれぞれTargetFrame、世界座標系で表現した位置$p$とすると、$_{W}\boldsymbol{p} = T_{W C_t} \   _{C_t}\boldsymbol{p}$が成り立つ。
- $T_{W C_h}$ : HostFrameから世界座標系への座標系変換。
- $\boldsymbol{q}(\boldsymbol{m})$ : Stereo graphic projectionされたランドマーク位置$\boldsymbol{m}$をHostFrameにおける３次元位置に変換する関数。Stereo graphic projectionの逆関数。
- $_h \boldsymbol{m}_{i} = [u,v,d_{inv}]^T$ : Stereo graphic projectionされたランドマーク位置。３次元位置をStereo graphic projectionすると二次元の平面に展開されるため、位置の情報は残らず方向しかわからない。そこで、$d_{inv}$として距離の逆数も保持している。
- $\boldsymbol{z}_{it}$ : ランドマーク$i$をTargetFrame $t$にて観測したときの画像上位置。

こういった再投影誤差を考えているためGaussNewton法などでカメラPoseやランドマーク位置を推定するためには下記のJacobianを計算する必要がある。
- $\frac{D \boldsymbol{r}_{it}}{D _h \boldsymbol{m}_i}$ : Stereo graphic projectionしたランドマーク位置$_h\boldsymbol{m}_i$についての再投影誤差のJacobian
- $\frac{D \boldsymbol{r}_{it}}{D T_{W C_t}}$ : TargetFrameについての再投影誤差のJacobian
- $\frac{D \boldsymbol{r}_{it}}{D T_{W C_h}}$ : HostFrameについての再投影誤差のJacobian