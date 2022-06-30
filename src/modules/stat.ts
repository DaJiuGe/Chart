export enum StatEnum {
  Rating = 'rating',
  RatingOverall = 'ratingOverall',
  RatingOverallCnt = 'ratingOverallCnt',
  ReviewOverallCnt = 'reviewOverallCnt',
  ReviewCnt = 'reviewCnt',
  NegReviewCnt = 'negReviewCnt',
  NegReviewRatio = 'negReviewRatio'
}

export const StatLabel: Record<StatEnum, string> = {
  [StatEnum.Rating]: '每日评分',
  [StatEnum.RatingOverall]: '总评分',
  [StatEnum.RatingOverallCnt]: '总评分数',
  [StatEnum.ReviewOverallCnt]: '总评论数',
  [StatEnum.ReviewCnt]: '评论新增数',
  [StatEnum.NegReviewCnt]: '差评新增数',
  [StatEnum.NegReviewRatio]: '差评率'
}

export const StatTooltip: Record<StatEnum, string> = {
  [StatEnum.Rating]: '每日评分',
  [StatEnum.RatingOverall]: '总评分',
  [StatEnum.RatingOverallCnt]: '总评分数',
  [StatEnum.ReviewOverallCnt]: '总评论数',
  [StatEnum.ReviewCnt]: '评论新增数',
  [StatEnum.NegReviewCnt]: '差评新增数',
  [StatEnum.NegReviewRatio]: '差评率'
}
